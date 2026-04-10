import express from "express";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const message = req.body.message?.toLowerCase();

    if (!message) {
      return res.json({
        reply: "⚠️ Please type your question so I can assist you."
      });
    }

    // =========================
    // 🧠 INTENT DETECTION
    // =========================
    let intent = "general";

    if (message.includes("hi") || message.includes("hello")) intent = "greeting";
    else if (message.includes("rent")) intent = "rent";
    else if (message.includes("buy")) intent = "buy";
    else if (message.includes("sell")) intent = "sell";
    else if (message.includes("price") || message.includes("budget")) intent = "price";
    else if (message.includes("location") || message.includes("area")) intent = "location";
    else if (message.includes("contact") || message.includes("support")) intent = "contact";
    else if (message.includes("feature") || message.includes("service")) intent = "features";
    else if (message.includes("login") || message.includes("account")) intent = "account";
    else if (message.includes("about")) intent = "about";

    // =========================
    // 🤖 PROFESSIONAL RESPONSES
    // =========================

    if (intent === "greeting") {
      return res.json({
        reply:
          "👋 Hello! Welcome to StayEase.\n\nI'm here to help you find, rent, or sell properties with ease.\n\nHow can I assist you today?"
      });
    }

    if (intent === "rent") {
      return res.json({
        reply:
          "🏠 Looking to rent a property?\n\nHere's how you can proceed:\n1️⃣ Go to the *Properties* section\n2️⃣ Select *Rent* option\n3️⃣ Apply filters like location, budget, and BHK\n4️⃣ Explore listings and view details\n\nLet me know if you need help choosing the right property 😊"
      });
    }

    if (intent === "buy") {
      return res.json({
        reply:
          "🛒 Planning to buy a property?\n\nFollow these steps:\n1️⃣ Visit the *Properties* page\n2️⃣ Browse available listings\n3️⃣ Compare prices and features\n4️⃣ Contact the seller for further details\n\nI can also help you with budget or location suggestions 👍"
      });
    }

    if (intent === "sell") {
      return res.json({
        reply:
          "💼 Want to sell your property?\n\nIt's simple:\n1️⃣ Login to your account\n2️⃣ Go to your profile\n3️⃣ Click on *Sell Property*\n4️⃣ Add property details and submit\n\nYour listing will be visible to potential buyers instantly 🚀"
      });
    }

    if (intent === "price") {
      return res.json({
        reply:
          "💰 Property prices vary based on location, size, and amenities.\n\n👉 You can use filters on the Properties page to set your budget and find the best options.\n\nIf you tell me your budget, I can guide you better 😊"
      });
    }

    if (intent === "location") {
      return res.json({
        reply:
          "📍 Location is a key factor when choosing a property.\n\nWe offer listings in multiple cities and areas.\n\n👉 You can search by city or locality using the search bar or filters.\n\nLet me know your preferred location!"
      });
    }

    if (intent === "contact") {
      return res.json({
        reply:
          "📞 You can reach us anytime:\n\n📧 Email: stayease07@gmail.com\n📱 Phone: +91 9798088801\n📍 Location: Aurangabad, Bihar\n\nWe're always happy to assist you!"
      });
    }

    if (intent === "features") {
      return res.json({
        reply:
          "✨ StayEase offers:\n\n✔ Smart property search\n✔ Easy filters (price, BHK, location)\n✔ Buy & Rent options\n✔ Simple and user-friendly interface\n✔ Fast and reliable results\n\nWe aim to make your property search smooth and stress-free 😊"
      });
    }

    if (intent === "account") {
      return res.json({
        reply:
          "👤 Need help with your account?\n\n👉 You can:\n- Login / Signup easily\n- Update your profile\n- Manage your property listings\n\nIf you're facing any issue, feel free to ask!"
      });
    }

    if (intent === "about") {
      return res.json({
        reply:
          "🏡 StayEase is a real estate platform designed to simplify property search.\n\nWhether you want to rent, buy, or sell — we provide a seamless experience with smart tools and filters."
      });
    }

    // =========================
    // 🤖 SMART DEFAULT RESPONSE
    // =========================

    return res.json({
      reply:
        "🤖 I'm here to help you with property-related queries.\n\nYou can ask things like:\n👉 How to rent a property?\n👉 How to sell property?\n👉 Contact details\n👉 Property prices\n\nPlease let me know how I can assist you 😊"
    });

  } catch (error) {
    console.log(error);
    res.json({
      reply: "⚠️ Something went wrong. Please try again."
    });
  }
});

export default router;