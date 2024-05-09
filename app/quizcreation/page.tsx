"use client";
import { Formik, Form, Field } from "formik";
import { createClient } from "@supabase/supabase-js";
import * as yup from "yup";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function QuizCreation() {
  const [feedback, setFeedback] = useState("");

  const QuizSchema = yup.object().shape({
    id: yup.string().max(120, "Too long!").required("Required."),
    question: yup.string().max(120, "Too long!").required("Required."),
    answer: yup.string().max(100, "Too long!").required("Required."),
  });

  const QuizValues = {
    id: "",
    question: "",
    answer: "",
  };

  async function handleSubmit(values, { resetForm }) {
    const { question, answer } = values;
    try {
      const { error } = await supabase
        .from("quiz_creation")
        .insert({ id, question, answer });
      if (error) {
        throw error;
      }
      setFeedback("Form submitted successfully");
      resetForm();
    } catch (error) {
      console.log("Error occurred", { error });
      setFeedback("An error occurred");
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={QuizValues}
      validationSchema={QuizSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="id">
            {({ field, meta }) => (
              <div className="form-control">
                <label mb="1.5" fontSize="sm" htmlFor="id">
                  Question Number
                </label>
                <input {...field} placeholder="Enter question number" id="id" />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>
          <Field name="question">
            {({ field, meta }) => (
              <div className="form-control">
                <label mb="1.5" fontSize="sm" htmlFor="question">
                  Question
                </label>
                <input {...field} placeholder="Enter question" id="question" />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>
          <Field name="answer">
            {({ field, meta }) => (
              <div className="form-control">
                <label mb="1.5" fontSize="sm" htmlFor="answer">
                  Answer
                </label>
                <input {...field} placeholder="Enter answer" id="answer" />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>

          <div className="button-container">
            <button type="submit" className="submit-button">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
