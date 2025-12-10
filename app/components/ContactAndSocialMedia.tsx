import React from "react";
import { ViewStyle } from "react-native";
import { Field } from "./Field";
import { SectionCard } from "./SectionCard";

interface ContactAndSocialMediaProps {
  contactIndex?: number;
  socialIndex?: number;
  fadeIn?: (index: number) => ViewStyle;
  facebookPlaceholder?: string;
  youtubePlaceholder?: string;
  instagramPlaceholder?: string;
}

export default function ContactAndSocialMedia({
  contactIndex = 7,
  socialIndex = 8,
  fadeIn,
  facebookPlaceholder = "https://facebook.com/yourprofile",
  youtubePlaceholder = "https://youtube.com/@yourchannel",
  instagramPlaceholder = "https://instagram.com/yourprofile",
}: ContactAndSocialMediaProps) {
  const defaultFadeIn = (index: number): ViewStyle => ({});
  const fadeInFn = fadeIn || defaultFadeIn;

  return (
    <>
      <SectionCard 
        index={contactIndex} 
        title="Contact Information" 
        subtitle="Your address and contact details" 
        fadeIn={fadeInFn}
      >
        <Field label="Address" placeholder="Street address" />
        <Field label="City" placeholder="City" />
        <Field label="State" placeholder="State" />
        <Field label="Pin Code" placeholder="XXXXX" keyboardType="numeric" maxLength={6}/>
      </SectionCard>

      <SectionCard 
        index={socialIndex} 
        title="Social Media Profiles" 
        subtitle="Connect your social media accounts (optional)" 
        fadeIn={fadeInFn}
      >
        <Field label="Facebook" placeholder={facebookPlaceholder} />
        <Field label="YouTube" placeholder={youtubePlaceholder} />
        <Field label="Instagram" placeholder={instagramPlaceholder} />
      </SectionCard>
    </>
  );
}
