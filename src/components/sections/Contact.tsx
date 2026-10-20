/**
 * Setor / Seção: Contato (Contact)
 * Permite que visitantes enviem mensagens diretamente ao profissional,
 * além de exibir informações de e-mail, telefone/WhatsApp, localização
 * e links para redes sociais (LinkedIn e GitHub).
 */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Contact() {
  const { dict } = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Validação dos campos com o Zod usando mensagens de erro localizadas
  const contactSchema = z.object({
    name: z.string().min(3, { message: dict.contact.validation.name }),
    email: z.string().email({ message: dict.contact.validation.email }),
    message: z.string().min(10, { message: dict.contact.validation.message }),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Server error");
      
      setStatus("success");
      reset();
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("error");
    }
  };

  const contactDetails = [
    {
      icon: <Mail className="w-5 h-5 text-indigo-500" />,
      label: "E-mail",
      value: "gestaolisboainfo@gmail.com",
      href: "mailto:gestaolisboainfo@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-cyan-500" />,
      label: "WhatsApp",
      value: "+55 (73) 98166-7518",
      href: "https://wa.me/5573981667518",
    },
    {
      icon: <MapPin className="w-5 h-5 text-violet-500" />,
      label: "Localização",
      value: "Ilhéus, Bahia, Brasil",
      href: "https://maps.google.com/?q=Ilheus,Bahia,Brasil",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-[#030303]/40 border-t border-zinc-100 dark:border-zinc-900/60 transition-colors"
    >
      {/* Elemento decorativo com desfoque (blur) de fundo */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-linear-to-tr from-violet-500/10 to-cyan-500/10 dark:from-violet-500/5 dark:to-cyan-400/5 glow-orb pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
            {dict.contact.title}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            {dict.contact.subtitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Painel da Esquerda: Informações de Contato e Redes Sociais */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {contactDetails.map((detail) => (
                <a
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={detail.label}
                  className="block group"
                >
                  <Card hoverEffect glass className="border-zinc-200/80 dark:border-zinc-800/80">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200/40 dark:border-zinc-800/60 group-hover:scale-110 transition-transform">
                        {detail.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-550 uppercase tracking-wider">
                          {detail.label}
                        </span>
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {detail.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            {/* Conexões de redes sociais (LinkedIn, GitHub) */}
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-xs flex items-center justify-around">
              <a
                href="https://linkedin.com/in/vinicius-andrade-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" /> LinkedIn
              </a>
              <a
                href="https://github.com/vinicius-andrade-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <GithubIcon className="w-5 h-5" /> GitHub
              </a>
            </div>
          </div>

          {/* Painel da Direita: Formulário de Contato usando React Hook Form */}
          <div className="lg:col-span-7">
            <Card glass className="border-zinc-200/80 dark:border-zinc-800/80">
              <CardContent className="p-6 sm:p-8">
                
                {/* Estados de feedback do formulário (Sucesso ou Erro) */}
                {status === "success" && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 mb-6">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
                    <p className="text-sm font-semibold">{dict.contact.success}</p>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-800 dark:text-red-300 mb-6">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                    <p className="text-sm font-semibold">{dict.contact.error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <Input
                    label={dict.contact.name}
                    placeholder="Vinicius Silva"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  
                  <Input
                    label={dict.contact.email}
                    type="email"
                    placeholder="voce@exemplo.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <Textarea
                    label={dict.contact.message}
                    placeholder="Olá Vinicius, gostaria de conversar sobre..."
                    error={errors.message?.message}
                    {...register("message")}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={status === "sending"}
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    {status === "sending" ? dict.contact.sending : dict.contact.send}
                  </Button>
                </form>

              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
}
