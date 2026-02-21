'use client'
import { motion } from "framer-motion";

 export default function Mandala() {
    return (
        <>
        <motion.div
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 animate-[spin_5s_linear_infinite]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
        >
            <img src="/mandala.png" alt="" className="h-14 sm:h-16 w-auto" />
        </motion.div>
        </>
    )
}