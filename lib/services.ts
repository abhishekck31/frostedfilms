export type ServiceDetails = {
  id: string;
  name: string;
  price: number;
  priceUnit: string;
  tagline: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
};

export const serviceData: Record<string, ServiceDetails> = {
  "frosted-film": {
    id: "frosted-film",
    name: "Frosted Film",
    price: 100,
    priceUnit: "per sqft",
    tagline: "The original privacy solution, perfected.",
    description: "Frosted window film provides a sandblasted or etched glass look at a fraction of the cost. It diffuses light beautifully while offering 24/7 privacy from both sides of the glass.",
    features: [
      "24/7 Privacy without blocking natural light",
      "Softens harsh sunlight and reduces glare",
      "Durable, long-lasting matte finish",
      "Scratch-resistant coating for easy maintenance"
    ],
    specs: [
      { label: "VLT (Light Transmission)", value: "65%" },
      { label: "UV Rejection", value: "98%" },
      { label: "Thickness", value: "2 mil" }
    ]
  },
  "sun-control": {
    id: "sun-control",
    name: "Sun Control Film",
    price: 105,
    priceUnit: "per sqft",
    tagline: "Beat the heat without losing the view.",
    description: "Our sun control films reflect solar energy, significantly reducing heat buildup and glare. Perfect for sun-facing windows in homes or offices, they keep your space cooler and protect your interiors from fading.",
    features: [
      "Rejects up to 70% of solar heat",
      "Blocks 99% of harmful UV rays",
      "Significantly reduces screen glare",
      "Helps lower air conditioning costs"
    ],
    specs: [
      { label: "Heat Rejection", value: "Up to 70%" },
      { label: "UV Rejection", value: "99%" },
      { label: "Thickness", value: "2 mil" }
    ]
  },
  "decorative": {
    id: "decorative",
    name: "Decorative Film",
    price: 125,
    priceUnit: "per sqft",
    tagline: "Artistic expression for any glass surface.",
    description: "Transform ordinary glass into an architectural feature. From elegant patterns to modern geometric designs, decorative films add character and tailored privacy to your space.",
    features: [
      "Wide variety of patterns and textures",
      "Customizable coverage for varied privacy levels",
      "Cost-effective alternative to designer glass",
      "Can be easily updated for new aesthetics"
    ],
    specs: [
      { label: "Finish", value: "Textured / Patterned" },
      { label: "Privacy Level", value: "Variable" },
      { label: "Thickness", value: "2-3 mil" }
    ]
  },
  "office-cabin": {
    id: "office-cabin",
    name: "Office Cabin Film",
    price: 115,
    priceUnit: "per sqft",
    tagline: "Professional privacy for modern workspaces.",
    description: "Designed specifically for corporate environments, this film offers clean lines and professional aesthetics. It provides essential privacy for meetings while maintaining an open-office feel.",
    features: [
      "Professional striped or gradient patterns",
      "Distraction-free environment for cabins",
      "Enhances corporate branding aesthetics",
      "Fingerprint resistant surface"
    ],
    specs: [
      { label: "Pattern", value: "Lines / Gradients" },
      { label: "VLT", value: "Variable" },
      { label: "Thickness", value: "2 mil" }
    ]
  },
  "one-way-vision": {
    id: "one-way-vision",
    name: "One Way Vision",
    price: 130,
    priceUnit: "per sqft",
    tagline: "See out clearly, stay hidden from outside.",
    description: "Utilizing advanced reflective technology, this film acts as a mirror from the outside during the day while allowing you a clear view out. It's the ultimate solution for daytime privacy.",
    features: [
      "Complete daytime privacy",
      "Mirror-like exterior finish",
      "High solar heat rejection",
      "Excellent glare reduction"
    ],
    specs: [
      { label: "Exterior Finish", value: "Reflective Mirror" },
      { label: "Heat Rejection", value: "Up to 80%" },
      { label: "UV Rejection", value: "99%" }
    ]
  },
  "black-out": {
    id: "black-out",
    name: "Black Out Film",
    price: 110,
    priceUnit: "per sqft",
    tagline: "Total light control for ultimate privacy.",
    description: "When you need absolute darkness and complete privacy, black out film is the answer. Ideal for media rooms, photography darkrooms, or bedrooms needing 100% light blockage.",
    features: [
      "100% light blockage",
      "Complete 2-way privacy",
      "Solid opaque finish",
      "Ideal for hiding unsightly views"
    ],
    specs: [
      { label: "VLT", value: "0%" },
      { label: "Finish", value: "Opaque Black" },
      { label: "Thickness", value: "2 mil" }
    ]
  }
};
