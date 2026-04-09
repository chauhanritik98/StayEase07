import express from "express";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const message = req.body.message?.toLowerCase();

    if (!message) {
      return res.json({ reply: "⚠️ Please type something." });
    }

    // =========================
    // 🧠 INTENT DETECTION
    // =========================
    let intent = "general";
   
    if (message.includes("rent")) intent = "rent";
    else if (message.includes("buy") || message.includes("purchase")) intent = "buy";
    else if (message.includes("sell")) intent = "sell";
    else if (message.includes("bhk") || message.includes("bedroom")) intent = "search";
    else if (message.includes("price") || message.includes("budget")) intent = "search";
    else if (message.includes("noida") || message.includes("delhi") || message.includes("mumbai")) intent = "search";
    else if (message.includes("hello") || message.includes("hi")) intent = "greeting";
    else if (message.includes("contact") || message.includes("support")) intent = "contact";
    else if (message.includes("feature") || message.includes("service")) intent = "features";
    else if (message.includes("stayease") || message.includes("about")) intent = "about";

    // =========================
    // 🧠 ENTITY EXTRACTION
    // =========================
    let bhk = message.match(/(\d)\s?bhk/);
    let price = message.match(/(\d{3,6})/);
    let location = "";

    if (message.includes("noida")) location = "Noida";
    if (message.includes("delhi")) location = "Delhi";
    if (message.includes("mumbai")) location = "Mumbai";

    // =========================
    // 🤖 RESPONSE SYSTEM
    // =========================

    // 👋 Greeting
    if (intent === "greeting") {
      return res.json({
        reply: "👋 Hello! I'm StayEase Assistant. I can help you find properties, rent, buy, and guide you."
      });
    }

    // 🏠 Rent
    if (intent === "rent") {
      return res.json({
        reply: "🏠 To rent a property:\n1. Go to Properties\n2. Select 'Rent'\n3. Apply filters like location & price\n4. Click 'View Details'"
      });
    }

    // 🛒 Buy
    if (intent === "buy") {
      return res.json({
        reply: "🛒 To buy a property:\n1. Choose 'Sell' option\n2. Browse listings\n3. Compare prices\n4. Contact seller"
      });
    }

    // 💼 Sell
    if (intent === "sell") {
      return res.json({
        reply: "💼 To sell your property:\n1. Login\n2. Click 'Sell Property'\n3. Add details\n4. Submit listing"
      });
    }

    // 🔍 Search
    if (intent === "search") {
      return res.json({
        reply: `🔍 Searching properties:
📍 Location: ${location || "Any"}
🏡 BHK: ${bhk ? bhk[1] + " BHK" : "Any"}
💰 Budget: ${price ? price[0] : "Any"}

👉 Use filters on website for best results.`
      });
    }

    // 📞 Contact
    if (intent === "contact") {
      return res.json({
        reply: "📞 You can contact us via Contact page or support email. We are available 24/7."
      });
    }

    // ⭐ Features
    if (intent === "features") {
      return res.json({
        reply: "✨ StayEase Features:\n- Smart property search\n- Filters (BHK, price, location)\n- Rent & Buy options\n- Easy UI\n- Fast results"
      });
    }

    // 🧠 About
    if (intent === "about") {
      return res.json({
        reply: "🏡 StayEase is a real estate platform where you can search, rent, and buy properties easily using smart filters."
      });
    }

    // 🤖 Default
    return res.json({
      reply: "🤖 I can help you find properties, explain features, or guide you. Try asking about rent, buy, or location."
    });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.json({
      reply: "⚠️ Something went wrong. Please try again."
    });
  }
});

export default router;