import React, { useRef, useState, useEffect } from "react";
import { API } from "../../api";
import { toast } from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
import { PulseLoader } from "react-spinners";

const initState = { loading: false, error: null, message: "" };

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState(initState);

  const handleInputFocus = (e) => {
    const label = e.target.previousSibling;
    label.classList.add("focused");
  };

  const handleInputBlur = (e) => {
    const input = e.target;
    const label = input.previousSibling;
    if (input.value === "") {
      label.classList.remove("focused");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.loading) return;
    setState(initState);
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await API.post("/messages/send", {
        names: name,
        email,
        phoneNumber: phone,
        message,
      });
      setState((prev) => ({
        ...prev,
        message:
          "Message sent successfully!",
      }));
      toast.success('Message sent successfully!', {
        duration: 7000,
        style: {
          background: '#294B29',
          color: '#ffffff',
        },
      });
      setEmail("");
      setName("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unknown error occured, please try again."
      );
      setState((prev) => ({
        ...prev,
        error:
          error.response?.data?.message ||
          error.message ||
          "Unknown error occured, please try again.",
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const contact_info = [
    { logo: "mail", text: "mugemaleo@gmail.com" },
    { logo: "logo-whatsapp", text: "+1 (770) 417-6080" },
    {
      logo: "location",
      text: "USA, Georgia-Atlanta",
    },
  ];
  return (
    <section id="contact" className="py-10 px-3 text-white">
      <div className="text-center mt-8">
        <h3 className="text-4xl font-semibold">
          Contact <span className="text-cyan-600">Me</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">Get in touch</p>

        <div
          className="mt-16 flex md:flex-row flex-col
         gap-6 max-w-5xl bg-gray-800 md:p-6 p-2 rounded-lg mx-auto"
        >
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-5">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <textarea
              type="text"
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Your Message"
              rows={7}
            ></textarea>
            <button className="btn-primary w-fit">
            {
              state.loading ? (
                <PulseLoader
                  color="#ffffff"
                  loading={true}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Send Message"
              )
            }
            </button>
          </form>
          <div className="flex flex-col  gap-7 md:w-[30%]">
            {contact_info.map((contact, i) => (
              <div
                key={i}
                className="flex flex-row  
                  text-left gap-4 flex-wrap items-center"
              >
                <div className="min-w-[3.5rem]  text-3xl min-h-[3.5rem] flex items-center justify-center text-white bg-cyan-600 rounded-full">
                  <ion-icon name={contact.logo}></ion-icon>
                </div>
                <p className="md:text-base text-sm  break-words">
                  {contact.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default Contact;
