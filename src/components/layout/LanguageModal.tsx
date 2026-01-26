'use client'

import { Languages, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { useState } from 'react'

export function LanguageModal() {
    const [open, setOpen] = useState(false)
    const { t, i18n } = useTranslation()

    const languages = [
        { code: 'en', label: t('language.en') },
        { code: 'it', label: t('language.it') },
    ]

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full hover:bg-secondary/80 transition-colors flex items-center justify-center text-foreground"
                        aria-label="Change language"
                    >
                        <Languages size={16} />
                        <span className="ml-1 text-[10px] font-bold uppercase">{i18n.language.split('-')[0]}</span>
                    </motion.button>
                }
            />

            <DialogContent className="max-w-sm rounded-3xl p-8 border border-border shadow-2xl bg-background/80 backdrop-blur-xl">
                <DialogHeader className="mb-8">
                    <DialogTitle className="text-subtitle tracking-tight font-bold text-center sm:text-center">
                        {t('language.title')}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-3">
                    {languages.map((lang) => {
                        const isActive = i18n.language.startsWith(lang.code)
                        return (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`
                  w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300
                  ${isActive
                                        ? 'border-primary bg-primary/10 text-foreground shadow-sm'
                                        : 'border-border hover:border-primary/50 hover:bg-secondary/50 text-muted-foreground'
                                    }
                `}
                            >
                                <span className="font-medium">{lang.label}</span>
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-black"
                                    >
                                        <Check size={12} strokeWidth={3} />
                                    </motion.div>
                                )}
                            </button>
                        )
                    })}
                </div>
            </DialogContent>
        </Dialog>
    )
}
