import { useState } from "react";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactno: "",
    message: "",
  });

  const [submitLoading, setSubmitLoading] = useState(false);

  // ✅ Same as SellerInfo
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Same working logic
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, contactno, message } = formData;

    if (!name || !email || !contactno || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    const templateParams = {
      customerName: name,
      customerEmail: email,
      customerContactNo: contactno,
      customerMessage: message,
    };

    const serviceID = "service_b3m728b";
    const templateID = "template_z5l0w3a";
    const userID = "TFcQTo-FR2W6qb9vk";

    setSubmitLoading(true);

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(() => {
        setSubmitLoading(false);
        toast.success("Your message has been sent successfully!");

        setFormData({
          name: "",
          email: "",
          contactno: "",
          message: "",
        });
      })
      .catch(() => {
        setSubmitLoading(false);
        toast.error("Failed to send your message. Please try again later.");
      });
  };

  return (
    <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          className="border rounded-lg p-4 w-full border-gray-300 outline-none focus:border-blue-700 transition duration-300"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Your Email"
          className="border rounded-lg p-4 w-full border-gray-300 outline-none focus:border-blue-700 transition duration-300"
        />

        <input
          type="text"
          name="contactno"
          value={formData.contactno}
          onChange={handleInputChange}
          placeholder="Your Contact Number"
          className="border rounded-lg p-4 w-full border-gray-300 outline-none focus:border-blue-700 transition duration-300"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Your Message"
          rows={4}
          className="border rounded-lg p-4 w-full border-gray-300 outline-none focus:border-blue-700 transition duration-300"
        />

        <button
          type="submit"
          disabled={submitLoading}
          className="py-3 px-6 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-300 font-semibold"
        >
          {submitLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;