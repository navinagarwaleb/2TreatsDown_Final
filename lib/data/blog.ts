export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    date: string;
    author: string;
    readTime: string;
    excerpt: string;
    body: string;
    image: string;
    imagePosition?: string;
    tags: string[];
    images?: string[];
    galleryTitle?: string;
    cta?: {
        text: string;
        href: string;
        external?: boolean;
    };
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: "ultimate-guide-dog-birthday-cakes-ottawa",
        title: "The Ultimate Guide to Dog Birthday Cakes in Ottawa (2025)",
        date: "May 2, 2025",
        author: "Akshata",
        readTime: "6 min read",
        excerpt:
            "Planning a celebration for your pup in Ottawa? We cover everything from sizing and flavours to allergies and how to order a custom dog cake in Kanata.",
        body: `Planning a celebration for your dog in Ottawa? You're not alone. More and more pet parents in Kanata, Stittsville, and across the National Capital Region are celebrating their pup with a custom dog cake. Birthdays, gotcha days, gender reveals, or just because. And honestly? Your dog deserves it.

At 2 Treats Down, we've baked hundreds of personalized dog cakes for Ottawa families. Here's everything you need to know about ordering one.

### What Size Dog Cake Should You Order?

We offer two sizes:
* **4-inch cake** - Perfect for smaller breeds or smaller gatherings. Serves 1-3 dogs comfortably.
* **6-inch cake** - Ideal for larger breeds, multi-dog households, or parties with doggy guests.

Both sizes come in either one layer or two layers, depending on the design. Not sure what's right for your pup? We can discuss and recommend a size based on your requirements.

### What Flavours Do Dogs Love Most?

Our best-selling flavour is Peanut Butter & Carrot. We can also accommodate other flavour preferences.

All cakes are made with human-grade ingredients. We only use xylitol-free peanut butter, ensuring every bite is safe for your pup. Every cake is baked fresh in our Kanata kitchen with no preservatives.

### Can You Accommodate Allergies?

Absolutely. We routinely work with dogs who have:
* Peanut or nut allergies
* Sensitive stomachs
* Low-protein dietary needs

Just mention any dietary requirements in your cake order request form, and we'll discuss suitable options while discussing your order.

### Can You Customize the Design?

Every cake is fully customizable. We've made cakes for birthdays, gotcha days, gender reveals, and nature-themed celebrations. Caricatures, portraits, seasonal themes, and more.

You share your vision with us. Colours, theme, reference images. We bring it to life with dog-safe frosting and decorations. Your dog's name can also be added to the cake.

### How Far in Advance Should You Order?

We recommend ordering at least 2 weeks in advance for custom cakes, especially during peak seasons (summer birthday months, holidays). The sooner the better. We've accommodated rush orders when possible, just reach out and we'll see what we can do.

### Pickup in Kanata

All cakes are available for local pickup at **418 Galatina Way, Kanata, ON**. We're easily accessible from Highway 417.

### How to Order

1. **Fill out our Custom Cake Request Form** with your date, size, design ideas, and any allergies.
2. **We'll get back to you within 24 hours** to discuss further details.
3. **After discussing the details, we get back to you** with a vision board and pricing in a week's time.
4. **Confirm your order**, we bake it fresh, and you pick it up.

*Pricing Note:* Cake pricing depends on size, number of layers, and design complexity. We share exact pricing after discussing your requirements so you only pay for what you need.

### Storage Tips

Since we don't use preservatives:
* **Refrigerated:** 5-7 days
* **Frozen:** Up to 6 months (thaw a couple hours before serving)
* **Slice and share.** One slice is plenty per dog.

### Ready to Order?

Whether it's a birthday, gotcha day, gender reveal, or just because. We'd love to bake something special for your pup.`,
        image: "/images/gallery/1st.webp",
        imagePosition: "center 30%",
        tags: ["Custom Cakes", "Ottawa", "Guide"],
    },
    {
        id: 2,
        slug: "ingredients-you-can-actually-pronounce",
        title: "Ingredients You Can Actually Pronounce",
        date: "June 2, 2025",
        author: "Akshata",
        readTime: "3 min read",
        excerpt:
            "I'll be honest with you: I'm not a pet nutritionist. But at 2 Treats Down, we have a simple rule: if I can't pronounce it, I don't bake with it.",
        body: `I'll be honest with you: I'm not a pet nutritionist. I didn't go to school for this. What I do have is a kitchen, a dog who means the world to me, and a simple rule: if I can't pronounce it, I don't bake with it.

When I started making treats for Piper, I'd flip over bags of store-bought treats and find ingredient lists that looked like a chemistry textbook. Preservatives, artificial flavours, fillers, things I'd never heard of. I'd stand there wondering: do I really want to feed this to my dog? The answer was always no.

So I started simple. Peanut butter. Sweet potatoes. Chicken. Eggs. Things I buy for my own kitchen. Things I understand.

Now, every treat we bake at 2 Treats Down starts with that same question: would I be happy eating this myself? If the answer's yes, it goes in the bowl. If I have to Google an ingredient to know what it is, it stays out.

### What that looks like in practice

Our peanut butter biscuits? Peanut butter, a touch of sweetness, baked simple. That's it. Our sweet potato chews? One ingredient: sweet potato, sliced and dehydrated. Our pupcakes? Flour based with peanut butter and carrot, our bestseller. Every ingredient serves a purpose. No filler, no extras.

This is also why we don't make wild claims about our treats. I'm not here to tell you these are a complete diet or a medical solution. They're treats: real food treats made with simple ingredients I trust.

### What we don't do

We don't claim to accommodate every allergy. If your dog needs a specific protein or a seed butter substitute, our kitchen might not be the right fit, and that's okay. We'd rather be honest about what we can and can't do.

We also draw a line between our treats and our celebration cakes. Treats are everyday rewards: crunchy biscuits, crunchy jerky, soft pupcakes. Our cakes are something special: custom, layered, decorated. Different products, different purposes. Both made with the same simple-ingredient philosophy.

### The short version

I use ingredients I know. I keep the list short. I don't use anything I can't pronounce. And I'd rather you know exactly what's in the bag than wonder.

That's it. That's the whole philosophy.`,
        image: "/images/gallery/5th.webp",
        tags: ["Ingredients", "Behind the Scenes", "Philosophy"],
    },
    {
        id: 3,
        slug: "june-pet-of-the-month-remy",
        title: "Introducing Our June Pet of the Month: Remy!",
        date: "June 7, 2026",
        author: "Akshata",
        readTime: "2 min read",
        excerpt: "Meet Remy, a beautiful 4-year-old Japanese Spitz and our very first Pet of the Month! Read about his favorite treats, funny begging habits, and picture-perfect smile.",
        body: `Meet Remy, our very first **Pet of the Month**! Remy is a stunning 4-year-old Japanese Spitz who captured our hearts with his bright smile, goofy antics, and friendly neighborhood habits.

To kick off our new monthly feature, we chatted with Remy's owner to learn all about this photogenic pup.

### Remy's Profile

* **Age:** 4 (born July 20, 2022)
* **Breed:** Japanese Spitz
* **Favourite Treats:** 2 Treats Down Chicken Jerky, or anything fishy (the stinkier, the better!)
* **Favorite Weekend Activities:** Exploring local markets, visiting pet shops, and running around at the park.

### His Goofy & Hilarious Habits

Every dog has a special quirk, and Remy's neighborhood routine is absolutely adorable. When out for walks, he will literally go around the neighborhood begging to see his friends by lying flat down on their driveways. He refuses to budge until he gets to say hello!

Remy is also a professional model. He was trained to pose for the camera at just 6 months old. Now, he instantly sits and smiles the moment a camera is pulled out. While he is happy to pose for other cameras too, he is also a pup of conviction—he will definitely let you know if he is not in the mood!

### A Note from Remy's Owner

*"I'm so glad Remy came into my life. He is cute, he is funny, and he is the reason I am inspired to take photos. He's also helped me make so many wonderful friends in our neighborhood."*

We are so happy to feature Remy on our new website and socials this month, and he will be receiving a special treat box filled with goodies from us! Stay tuned for July's Pet of the Month entries—keep sharing your cute pup photos and tagging @2treatsdown for a chance to be featured next! 🐾

*Photo Credit: Special thanks to [Wiggle Reflection](https://www.instagram.com/wiggle_reflection/) for capturing these gorgeous professional photos of Remy! 📸*`,
        image: "/images/blog/remy-1.webp",
        imagePosition: "center 25%",
        tags: ["Pet of the Month", "Community", "Feature"],
        images: [
            "/images/blog/remy-2.webp",
            "/images/blog/remy-3.webp",
            "/images/blog/remy-4.webp"
        ],
        galleryTitle: "More of Remy",
        cta: {
            text: "Follow Remy on Instagram 📸",
            href: "https://www.instagram.com/remy_spitz720/",
            external: true
        },
    },
    {
        id: 4,
        slug: "rescue-spotlight-ceilidh-husky-mix",
        title: "Rescue Spotlight: Meet Ceilidh, the Resilient Husky Mix in Kanata",
        date: "June 20, 2026",
        author: "Akshata",
        readTime: "3 min read",
        excerpt: "Ceilidh is a sweet, active 6-month-old Husky mix looking for her forever home in Ottawa. Learn about her story, her playful personality, and how you can support her.",
        body: `We are incredibly proud to launch our new **Rescue Spotlight** feature! At 2 Treats Down, we believe every dog deserves a loving home and a healthy start. Each month, we will highlight one special local foster dog to help them find their perfect family.

To kick off this initiative, we are introducing **Ceilidh**, a resilient and loving puppy currently in foster care in Kanata.

### Ceilidh's Profile

* **Age:** 6 months old (arrived in care December 2025)
* **Breed:** Husky Mix
* **Location:** Fostered locally in Kanata, ON (living with foster sibling Autumn)
* **Status:** Available for adoption!

### Her Story & Personality

Ceilidh arrived at the rescue last winter with her mother, Nuqa, and her siblings. While the rest of her family has happily found their forever homes, Ceilidh is still waiting for her perfect match. 

She is sweet, curious, and beautifully independent. An active and highly intelligent puppy, Ceilidh loves going on long walks, exploring the outdoors, playing with other dogs, and spending quality time with children. She thrives on adventure and learning new tricks, but she also loves nothing more than relaxing and cuddling up next to you after a busy day.

### A Brave and Resilient Heart

Shortly after entering rescue care, Ceilidh was diagnosed with a **grade four heart murmur**. While she occasionally experiences mild symptoms like panting, her vet team continues to monitor her closely, and it does not affect her energy levels, daily activities, or overall quality of life. She remains a happy, affectionate, and incredibly resilient young pup who is ready to offer a lifetime of love to the right family.

### How You Can Help

Even if you aren't currently looking to adopt, you can make a huge difference:
1. **Spread the word**: Share Ceilidh's story with friends, family, or anyone looking to adopt a dog in Ottawa.
2. **Apply to Adopt**: If you think you might be Ceilidh's perfect match, you can learn more and view her detailed adoption info.`,
        image: "/images/blog/ceilidh.webp",
        imagePosition: "center 35%",
        tags: ["Rescue Spotlight", "Adoption", "Community"],
        cta: {
            text: "View Ceilidh's Adoption Post 🩵",
            href: "https://www.facebook.com/share/p/1BC4QHTrdN/?mibextid=wwXIfr",
            external: true
        },
    },
    {
        id: 5,
        slug: "july-pet-of-the-month-nemo",
        title: "Introducing Our July Pet of the Month: Nemo!",
        date: "July 4, 2026",
        author: "Akshata",
        readTime: "2 min read",
        excerpt:
            "Meet Nemo, a goofy, lovable 1-year-old Husky-German Shepherd mix and our July Pet of the Month! Read about his Operation Stay Up, toy tornadoes, and treat-loving heart.",
        body: `Meet Nemo, our July **Pet of the Month**! Nemo is a handsome Husky-German Shepherd mix who won us over with his expressive face, endless energy, and his very own bedtime loophole operation.

To keep this monthly tradition going strong, we caught up with Nemo's family to learn about the puppy who treats every person like a potential best friend.

### Nemo's Profile

* **Age:** 1 (born June 23, 2025)
* **Breed:** Husky-German Shepherd Mix
* **Favourite Treats:** 2 Treats Down Cheese Nibbles or freeze-dried salmon
* **Favorite Activities:** Laying on the lawn, playing with every single toy from his bin, and greeting all his neighbours

### His Goofy & Hilarious Habits

Every night, right on cue, Nemo launches Operation Stay Up. The routine is always the same: the moment he hears "time for bed," he bolts off to find the other parent, climbs on top of them, and snuggles as sweetly as possible in hopes everyone will forget he has a bedtime. We'd say it's a pretty smart negotiation tactic! 😄

By day, Nemo's toy bin doesn't stand a chance. He loves all of his toys and usually pulls every single one out by the end of the day. His favourite game is finding the tiniest toy and begging someone to play tug with him.

When he's not playing with his toys, Nemo loves relaxing on the lawn and saying hello to all of his neighbours. After all, he believes every person he meets is a potential best friend.

### A Note from Nemo's Family

"Nemo thinks every person he meets is a potential best friend. If he could say one thing to everyone, it would be: "Please rub my belly and give me treats."" 😂

We're so excited to feature Nemo as our July Pet of the Month! He'll be receiving a special treat box from us to celebrate, and we can't wait to see him enjoy his goodies.

Think your pup would make a great Pet of the Month? We'd love to meet them! Keep tagging @2treatsdown in your photos, reels, and stories, and mention "Pet of the Month" when you enter for a chance to be featured next month. 🐾

*Photo Credit: Special thanks to Nemo's family for sharing these adorable snapshots of their boy! 📸*`,
        image: "/images/blog/nemo-1.jpg",
        imagePosition: "center 35%",
        tags: ["Pet of the Month", "Community", "Feature"],
        images: [
            "/images/blog/nemo-2.jpg",
            "/images/blog/nemo-3.jpg",
            "/images/blog/nemo-4.jpg",
            "/images/blog/nemo-5.jpg",
            "/images/blog/nemo-6.jpg",
        ],
        galleryTitle: "More of Nemo",
        cta: {
            text: "Follow Nemo on Instagram 📸",
            href: "https://www.instagram.com/northernnemo?igsh=MWl2ZDU2NzdjNDFiOA==",
            external: true
        },
    },
];
