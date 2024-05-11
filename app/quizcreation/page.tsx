"use client";
import { Formik, Form, Field } from "formik";
import { createClient } from "@supabase/supabase-js";
import * as yup from "yup";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function QuizCreation() {
  const [feedback, setFeedback] = useState("");

  const QuizSchema = yup.object().shape({
    week_number: yup.number().max(12, "Week must be 1 to 12").required("Required."),
    question: yup.string().max(120, "Too long!").required("Required."),
    correct_answer: yup.string().max(100, "Too long!").required("Required."),
    incorrect_answer1: yup.string().max(100, "Too long!").required("Required."),
    incorrect_answer2: yup.string().max(100, "Too long!").required("Required."),
    incorrect_answer3: yup.string().max(100, "Too long!").required("Required."),
  });

  const QuizValues = {
    week_number: "",
    question: "",
    correct_answer: "",
    incorrect_answer1: "",
    incorrect_answer2: "",
    incorrect_answer3: "",
  };

  async function handleSubmit(values: any, { resetForm }: any) {
    try {
      const { error } = await supabase.from("quiz1").insert({
        week_number: values.week_number,
        question: values.question,
        correct_answer: values.correct_answer,
        incorrect_answer1: values.incorrect_answer1,
        incorrect_answer2: values.incorrect_answer2,
        incorrect_answer3: values.incorrect_answer3,
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
          <Field name="week_number">
            {({ field, meta }: any) => (
              <div className="form-control">
                <label>Week</label>
                <input {...field} placeholder="Enter the week number" id="week_number" />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>
          <Field name="question">
            {({ field, meta }: any) => (
              <div className="form-control">
                <label>Question</label>
                <input {...field} placeholder="Enter question" id="question" />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>
          <Field name="correct_answer">
            {({ field, meta }: any) => (
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
          <Field name="incorrect_answer1">
            {({ field, meta }: any) => (
              <div className="form-control">
                <label>Incorrect Answer</label>
                <input {...field} placeholder="Enter incorrect answer 1" id="incorrect_answer1" />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>
          <Field name="incorrect_answer2">
            {({ field, meta }: any) => (
              <div className="form-control">
                <label>Incorrect Answer</label>
                <input {...field} placeholder="Enter incorrect answer 2" id="incorrect_answer2" />
                {meta.error && meta.touched && <p>{meta.error}</p>}
              </div>
            )}
          </Field>
          <Field name="incorrect_answer3">
            {({ field, meta }: any) => (
              <div className="form-control">
                <label>Incorrect Answer</label>
                <input {...field} placeholder="Enter incorrect answer 3" id="incorrect_answer3" />
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
