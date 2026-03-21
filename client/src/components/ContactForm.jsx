import { useState } from "react";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [contactInfo, setContactInfo] = useState({
    userName: "",
    userEmail: "",
    userMessage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ********* Handle Input Changes ********* //
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [id]: value,
    });
  };

  // ********* Handle Form Submission ********* //
  const handleFormSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const serviceID = "service_b3m728b";
    const templateID = "template_35prkpr";
    const userID = "TFcQTo-FR2W6qb9vk";

    const { userName, userEmail, userMessage } = contactInfo;
    if (!userName || !userEmail || !userMessage) {
      toast.error("Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    emailjs
      .send(serviceID, templateID, contactInfo, userID)
      .then(() => {
        setIsSubmitting(false);
        toast.success(
          "Your message has been sent successfully. We'll get in touch with you soon."
        );
        setContactInfo({
          userName: "",
          userEmail: "",
          userMessage: "",
        });
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.log(error);

        toast.error(
          error.message ||
            "Failed to send your message. Please try again later."
        );
      });
  };

  return (
    <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        Send Us a Message
      </h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="userName"
          value={contactInfo.userName}
          onChange={handleInputChange}
          placeholder="Your Name"
          className="border rounded-lg p-4 w-full border-gray-300 outline-none focus:border-blue-700 transition duration-300"
        />
        <input
          type="email"
          id="userEmail"
          value={contactInfo.userEmail}
          onChange={handleInputChange}
          placeholder="Your Email"
          className="border rounded-lg p-4 w-full border-gray-300 outline-none focus:border-blue-700 transition duration-300"
        />
        <textarea
          id="userMessage"
          value={contactInfo.userMessage}
          onChange={handleInputChange}
          placeholder="Your Message"
          className="border rounded-lg p-4 w-full border-gray-300 outline-none focus:border-blue-700 transition duration-300"
          rows={4}
        />
        <button
          type="submit"
          className="py-3 px-6 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-300 font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
