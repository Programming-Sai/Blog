"use client";
import React, { useEffect, useState } from "react";
import styles from "./contactcontentsection.module.css";
import { useSession } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";

const ContactContentSection = ({ className }) => {
  const { data, status } = useSession();

 
  const isLoggedin = status === "authenticated";
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCaptchaChange = (token) => setCaptchaToken(token);


  useEffect(() => {
    if (status === "authenticated" && data?.user?.email) {
      setFrom(data.user.email);
      console.log("CURRENT DATA:", data)
    }
  }, [data, status]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!captchaToken) {
      setError("Please complete the captcha");
      return;
    }
    setLoading(true);

    const payload = { from, subject, message, captchaToken };

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": process.env.NEXT_PUBLIC_CSRF_TOKEN, // CSRF Token
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Error sending email");
      }
      setSuccess("Your message has been sent!");
      setSubject("");
      setMessage("");
      setCaptchaToken(null);
    } catch (error) {
      setError("Error sending email: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`${styles.container} ${className}`} onSubmit={handleSubmit}>
      {!isLoggedin && (
        <input type="email" placeholder="Your Email..." required value={from} onChange={(e) => setFrom(e.target.value)} />
      )}
      <input type="text" placeholder="Subject..." required value={subject} onChange={(e) => setSubject(e.target.value)} />
      <textarea placeholder="Message..." required value={message} onChange={(e) => setMessage(e.target.value)} />
      
      
      <div className={styles.captchaContainer} style={{marginInline:'auto'}}>
        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
      </div>
      <div className={styles.centerSubmitButton}>
        <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send"}</button>
      </div>
      
      {(error && !success) && <p style={{marginInline:'auto', padding:'10px 30px', borderRadius:'100px', backgroundColor:'rgba(255,0,0,0.5)'}}>{error}</p>}

      {(success && !error) && <p style={{marginInline:'auto', padding:'10px 30px', borderRadius:'100px', backgroundColor:'rgba(0,255,0,0.5)'}}>{success}</p>}
    </form>
  );
};

export default ContactContentSection;
