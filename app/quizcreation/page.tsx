"use client";
import { Formik, Form, Field } from "formik";
import { createClient } from "@supabase/supabase-js";
import * as yup from "yup";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function QuizCreation() {
  const [feedback, setFeedback] = useState("");

  const QuizSchema = yup.object().shape({
    question: yup.string().max(120, "Too long!").required("Required."),
    correct_answer: yup.string().max(100, "Too long!").required("Required."),
    answer2: yup.string().max(100, "Too long!").required("Required."),
    answer3: yup.string().max(100, "Too long!").required("Required."),
    answer4: yup.string().max(100, "Too long!").required("Required."),
  });

  const QuizValues = {
    question: "",
    correct_answer: "",
    answer2: "",
    answer3: "",
    answer4: "",
  };

  async function handleSubmit(values, { resetForm }) {
    try {
      const { error } = await supabase.from("quiz_creation").insert({
        question: values.question,
        correct_answer: values.correct_answer,
        answer2: values.answer2,
        answer3: values.answer3,
        answer4: values.answer4,
      });
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
          <Field name="question">
            {({ field, meta }) => (
              <div className="form-control">
                <label>Question</label>
                <input {...field} placeholder="Enter question" id="question" />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>
          <Field name="correct_answer">
            {({ field, meta }) => (
              <div className="form-control">
                <label>Correct Answer</label>
                <input
                  {...field}
                  placeholder="Enter the correct answer"
                  id="correct_answer"
                />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>
          <Field name="answer2">
            {({ field, meta }) => (
              <div className="form-control">
                <label>Incorrect Answer</label>
                <input {...field} placeholder="Enter answer 2" id="answer2" />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>
          <Field name="answer3">
            {({ field, meta }) => (
              <div className="form-control">
                <label>Incorrect Answer</label>
                <input {...field} placeholder="Enter answer 3" id="answer3" />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>
          <Field name="answer4">
            {({ field, meta }) => (
              <div className="form-control">
                <label>Incorrect Answer</label>
                <input {...field} placeholder="Enter answer 4" id="answer4" />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>

          <div className="button-container">
            {feedback && <p>{feedback}</p>}
            <button type="submit" className="submit-button">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
