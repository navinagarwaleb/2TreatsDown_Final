"use client";

import { motion } from "framer-motion";

export default function FAQ() {
    const faqs = [
        {
            category: "🐾 Products & Ingredients",
            questions: [
                {
                    q: "Are your treats safe for dogs?",
                    a: "Yes! All our treats are made specifically for dogs using dog-safe, human-grade ingredients."
                },
                {
                    q: "Do you use preservatives?",
                    a: "No. We do not use preservatives in any of our treats, pupcakes, or cakes."
                },
                {
                    q: "Are your treats human-grade?",
                    a: "Yes — we use human-grade ingredients, but our treats are made for dogs, not humans."
                },
                {
                    q: "Where do you source your ingredients from?",
                    a: "We source local and high-quality ingredients whenever possible and choose ingredients we understand and trust."
                },
                {
                    q: "Can humans eat your treats?",
                    a: "Our treats are made for dogs and formulated for their dietary needs, so we recommend keeping them just for pups 🐶"
                },
                {
                    q: "Are your treats homemade?",
                    a: "Yes! All our treats are homemade in small batches by me, ensuring quality, freshness, and lots of love in every bite."
                }
            ]
        },
        {
            category: "🧁 Pupcakes & Cakes",
            questions: [
                {
                    q: "How long do pupcakes and cakes last?",
                    a: "Because we don’t use preservatives:\nRefrigerated: 5–7 days\nFrozen: Up to 6 months\n(Thaw couple of hours before serving.)"
                },
                {
                    q: "Can cakes be customized?",
                    a: "Yes! We offer custom cakes that can be adjusted for dietary needs and allergy restrictions."
                },
                {
                    q: "What cake sizes do you offer?",
                    a: "We offer two cake sizes — 4-inch and 6-inch.\nCakes can be made as one or two layers, depending on the design."
                },
                {
                    q: "What flavours do you offer?",
                    a: "Our bestseller flavour is Peanut Butter & Carrot. We also offer Peanut Butter & Banana. If your dog has a peanut butter allergy/does not like PB or needs to be on a low-protein diet, we’re happy to accommodate.\n\nPlease mention any dietary requirements in your Cake Order Request Form so we can discuss suitable options."
                },
                {
                    q: "What are the prices for your cakes?",
                    a: "Cake pricing depends on the size, number of layers, and design details. We’re happy to share pricing once we discuss your requirements and design ideas after receiving your Cake Order Request Form."
                },
                {
                    q: "Do you offer cakes for dog birthdays and special occasions?",
                    a: "Absolutely! Birthdays, gotcha days, holidays, gender reveal or just because — every pup deserves a celebration."
                },
                {
                    q: "Do you offer single pupcakes?",
                    a: "Due to feasibility, we currently offer regular-sized pupcakes in packs of 4 or packs of 6.\nMini pupcakes are available in packs of 6 only.\nWe do not offer single pupcakes for regular orders.\nHowever, single pupcakes may occasionally be available at the Carp Farmers’ Market. Follow us on Instagram to stay updated on market availability."
                },
                {
                    q: "Do you offer meat cakes?",
                    a: "At the moment, we do not offer meat-based cakes. However, this is something we’re actively working on — stay tuned on our social media as we plan to introduce meat cake options in 2026."
                }
            ]
        },
        {
            category: "🛒 Ordering & Pick-Up",
            questions: [
                {
                    q: "How do I place an order?",
                    a: "For treats, orders can be placed directly through our website. Since everything is made to order, please allow the stated preparation time as we do not keep ready-made stock.\n\nFor cakes and pupcakes, please fill out our Cake Order Request Form. Once submitted, we’ll get in touch with you to discuss the details, customization, and availability before confirming your order."
                },
                {
                    q: "Do you offer delivery?",
                    a: "At this time, we offer local pick-up. We are based in Kanata and Pick-up details are shared after ordering."
                },
                {
                    q: "How much notice do you need for custom orders?",
                    a: "We prefer at least 2 weeks’ notice for custom cake and pupcake orders, as we do book up quickly. Availability can vary, so we recommend checking with us in advance.\n\nIf you have a short-notice or urgent request, please mention this in your Cake Order Request Form and we’ll do our best to accommodate, depending on availability."
                },
                {
                    q: "How is payment handled?",
                    a: "For treat orders placed through our website, payment is completed online at checkout. For cakes and pupcakes ordered via manual invoice, payment is accepted via e-transfer or cash."
                },
                {
                    q: "Do you require a deposit for cakes or pupcakes?",
                    a: "Yes. Once the design and pickup date are confirmed, a 50% deposit is required to secure your cake or pupcake order.\n\nThe deposit is non-refundable if the order is cancelled within 5 days of the pickup date. The remaining balance is due at pickup and can be paid via e-transfer or cash."
                },
                {
                    q: "How should I take care of the cake after pickup?",
                    a: "Depending on the cake size and design, some cake boards may be taped to the bottom of the box to prevent sliding during transport. Please remove the cake carefully when opening the box.\n\nIf your cake includes biscuit toppers, these are often placed on cookie sticks, which are not edible.\nAlways supervise your pup while they enjoy the cake, and gently wiggle the sticks out before serving the biscuits.\n\nAll relevant care and handling instructions will be explained at the time of pickup, based on your specific order."
                }
            ]
        },
        {
            category: "🧊 Storage & Feeding",
            questions: [
                {
                    q: "How should I store treats?",
                    a: "Store treats in a cool, dry place. Since we do not use preservatives, we recommend refrigerating regular treats to maintain freshness.\n\nFor a longer shelf life, treats can be frozen and thawed as needed."
                },
                {
                    q: "How many treats can I give my dog?",
                    a: "Treats should be given in moderation and as part of a balanced diet. They are meant to complement — not replace — your dog’s regular meals.\n\nAlways ensure your dog has access to a clean bowl of fresh water."
                }
            ]
        },
        {
            category: "🐕 Allergies & Dietary Needs",
            questions: [
                {
                    q: "Do you accommodate allergies?",
                    a: "Yes! Please let us know about any allergies or dietary restrictions when placing your order."
                },
                {
                    q: "Are your treats grain-free?",
                    a: "Some products are grain-free, while others are not. Please check individual product descriptions or ask us if you’re unsure."
                }
            ]
        },
        {
            category: "🐾 Markets & Community",
            questions: [
                {
                    q: "Where can I find you in person?",
                    a: "You can find us at local markets including Carp Farmers’ Market (May to October - Saturdays) and Stittsville Barn Market (May to October - Alternate Sundays)"
                },
                {
                    q: "Do you take feedback seriously?",
                    a: "Absolutely — feedback helped shape our recipes from day one and continues to guide what we make."
                }
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4 text-center">
                FAQs – Everything You Need to Know
            </h1>
            <p className="text-center text-lg text-brand-dark/70 mb-16">
                Got questions? We’ve got answers! Here are some of the most common questions we get about our treats, pupcakes, cakes, and ordering process.
            </p>

            <div className="space-y-12 shrink-0">
                {faqs.map((section, sidx) => (
                    <motion.div
                        key={sidx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: sidx * 0.1, duration: 0.5 }}
                        className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-brand-pink/50"
                    >
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-orange mb-8 pb-4 border-b border-brand-pink">
                            {section.category}
                        </h2>
                        <div className="space-y-8">
                            {section.questions.map((faq, qidx) => (
                                <div key={qidx} className="space-y-2">
                                    <h3 className="text-xl font-bold text-brand-dark">Q: {faq.q}</h3>
                                    <div className="text-brand-dark/80 whitespace-pre-wrap leading-relaxed">
                                        {faq.a}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
            >
                <h3 className="text-2xl font-bold font-heading text-brand-dark mb-4">
                    📩 Still Have Questions?
                </h3>
                <p className="text-brand-dark/70 mb-6">
                    Didn’t see your question here? Feel free to reach out — we’re always happy to help!
                </p>
                <a
                    href="mailto:contact@2treatsdown.com"
                    className="inline-block bg-brand-orange hover:bg-brand-brown transition-colors text-white px-8 py-4 rounded-full font-bold text-lg shadow-md"
                >
                    Contact Us
                </a>
            </motion.div>
        </div>
    );
}
