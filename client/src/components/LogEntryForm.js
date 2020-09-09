import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import TravelLogContext from "../context/travelLog-context";
import { createLogEntry } from "../api/api";

const LogEntryForm = () => {
  const { addEntry, setAddEntry, setTravelLogs, travelLogs } = useContext(
    TravelLogContext
  );
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const entry = {
        ...data,
        location: {
          type: "Point",
          coordinates: [addEntry.longitude, addEntry.latitude],
        },
      };
      const test = await createLogEntry(entry);
      console.log(test);
      setLoading(false);
      setAddEntry(null);
      setTravelLogs([...travelLogs, entry]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form className={`entry-form`} onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input name="title" placeholder="Title..." ref={register} />

        <label>Description</label>
        <input name="description" placeholder="Description..." ref={register} />

        <label>Comments</label>
        <textarea name="comments" placeholder="Comments..." ref={register} />

        <label>Image (url)</label>
        <input name="image" placeholder="Image url" ref={register} />

        <label>Visit date</label>
        <input name="visitDate" type="date" ref={register} />

        <label>Rating (0 - 10 )</label>
        <input name="rating" placeholder="0  - 10" ref={register} />

        <button onSubmit={onSubmit}>Add Entry</button>
      </form>
    </div>
  );
};

export default LogEntryForm;
