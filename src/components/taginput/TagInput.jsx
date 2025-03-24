import { useContext, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { ThemeContext } from "@/context/ThemeContext";



export const TagInput = ({ keywords, setKeywords }) => {
  const { theme } = useContext(ThemeContext);
  const [selectedTags, setSelectedTags] = useState(keywords.map((tag) => ({ value: tag, label: tag })));
  const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      setSelectedTags(keywords.map((tag) => ({ value: tag, label: tag })));
    }, [keywords]);
    

  const handleChange = (selectedOptions) => {
    setSelectedTags(selectedOptions || []);
    setKeywords(selectedOptions.map((tag) => tag.value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTags(inputValue);
    }
  };

  const handleInputChange = (value, { action }) => {
    if (action === "input-change") {
      setInputValue(value);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    addTags(pastedText);
  };

  const addTags = (text) => {
    const tags = text
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (tags.length > 0) {
      const newTags = [...selectedTags, ...tags.map((t) => ({ value: t, label: t }))];
      const uniqueTags = removeDuplicates(newTags);
      setSelectedTags(uniqueTags);
      setKeywords(uniqueTags.map((tag) => tag.value));
    }
    setInputValue(""); // ✅ Clears input after adding
  };

  const removeDuplicates = (tags) => {
    const uniqueTags = new Map();
    tags.forEach((tag) => uniqueTags.set(tag.value, tag));
    return Array.from(uniqueTags.values());
  };

  return (
    <CreatableSelect
      isMulti
      options={[]} // Users can enter anything
      value={selectedTags}
      onChange={handleChange}
      onInputChange={handleInputChange} // ✅ Tracks input changes
      onKeyDown={handleKeyDown} // ✅ Handles Enter and ,
      onPaste={handlePaste} // ✅ Handles pasting
      inputValue={inputValue} // ✅ Clears input after adding tags
      placeholder="Type or paste tags..."
      menuIsOpen={false}
      styles={{
        control: (base, state) => ({
          ...base,
          borderRadius: "10px",
          outlineColor: "green",
          padding: "10px",
          color: theme === 'dark' ? "white" : "black",
          backgroundColor: theme === 'dark' ? "rgba(217, 217, 217, 0.05)" : "rgba(217, 217, 217, 0.2)",
          width:'100%',
          boxShadow: "none",
          borderWidth:'0px'
        }),
        input: (base) => ({
            ...base,
            color: theme === 'dark' ? "white" : "black",
            backgroundColor: theme === 'dark' ? "rgba(217, 217, 217, 0.2)" : "rgba(217, 217, 217, 1)",
            borderRadius:'100px',
            padding:'5px 10px',
        }),
        placeholder: (base) => ({
            ...base,
            color: "#bbbbbb", // ✅ Placeholder text color (light gray)
            opacity: 1, 
            fontSize:'12px',
            padding:'5px 10px',
            position: "absolute"
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: theme === 'dark' ? "rgba(217, 217, 217, 0.2)" : "rgba(217, 217, 217, 1)",
          borderRadius: "100px",
          padding: "2px 6px",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: theme === 'dark' ? "white" : "black",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: theme === 'dark' ? "white" : "black",
          ":hover": { backgroundColor: "rgba(6, 120, 11, 0.6)", borderRadius:'100%' },
        }),
      }}
    />
  );
};
