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
    week_number: yup
      .number()
      .max(12, "Week must be 1 to 12")
      .required("Required."),
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
    <div className="flex-1 w-full flex items-center justify-evenly">
      <Formik
        enableReinitialize
        initialValues={QuizValues}
        validationSchema={QuizSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="animate-fade-up flex w-[50%] flex-col justify-center gap-2 text-foreground  bg-loginblue p-6 rounded-2xl my-10">
            <Field className="" name="week_number">
              {({ field, meta }: any) => (
                <div className="form-control">
                  <label className="font-bold">Week</label>
                  <input
                    className="bg-white w-[25%] rounded-2xl px-4 py-2 bg-inherit border m-6 dark:text-black"
                    {...field}
                    placeholder="Enter the week number"
                    id="week_number"
                    type="number"
                    min="1"
                    max="12"
                  />
                  {meta.error && meta.touched && (
                    <p className="p-4 bg-foreground/10 text-foreground text-center rounded-2xl text-pink-300">
                      {meta.error}
                    </p>
                  )}
                </div>
              )}
            </Field>
            <Field name="question">
              {({ field, meta }: any) => (
                <div className="form-control">
                  <label className="font-bold">Question</label>
                  <textarea
                    className="bg-white rounded-2xl px-4 py-2 bg-inherit border m-6 dark:text-black"
                    {...field}
                    placeholder="Enter question"
                    id="question"
                  />
                  {meta.error && meta.touched && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-2xl text-pink-300">
                      {meta.error}
                    </p>
                  )}
                </div>
              )}
            </Field>
            <Field name="correct_answer">
              {({ field, meta }: any) => (
                <div className="form-control">
                  <label className="font-bold">Correct Answer</label>
                  <textarea
                    className="bg-white rounded-2xl px-4 py-2 bg-inherit border m-6 dark:text-black"
                    {...field}
                    placeholder="Enter the correct answer"
                    id="correct_answer"
                  />
                  {meta.error && meta.touched && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-2xl text-pink-300">
                      {meta.error}
                    </p>
                  )}
                </div>
              )}
            </Field>
            <Field name="incorrect_answer1">
              {({ field, meta }: any) => (
                <div className="form-control">
                  <label className="font-bold">Incorrect Answer</label>
                  <textarea
                    className="bg-white rounded-2xl px-4 py-2 bg-inherit border m-6 dark:text-black"
                    {...field}
                    placeholder="Enter incorrect answer 1"
                    id="incorrect_answer1"
                  />
                  {meta.error && meta.touched && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-2xl text-pink-300">
                      {meta.error}
                    </p>
                  )}
                </div>
              )}
            </Field>
            <Field name="incorrect_answer2">
              {({ field, meta }: any) => (
                <div className="form-control">
                  <label className="font-bold">Incorrect Answer</label>
                  <textarea
                    className="bg-white rounded-2xl px-4 py-2 bg-inherit border m-6 dark:text-black"
                    {...field}
                    placeholder="Enter incorrect answer 2"
                    id="incorrect_answer2"
                  />
                  {meta.error && meta.touched && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-2xl text-pink-300">
                      {meta.error}
                    </p>
                  )}
                </div>
              )}
            </Field>
            <Field name="incorrect_answer3">
              {({ field, meta }: any) => (
                <div className="form-control">
                  <label className="font-bold">Incorrect Answer</label>
                  <textarea
                    className="bg-white rounded-2xl px-4 py-2 bg-inherit border m-6 dark:text-black"
                    {...field}
                    placeholder="Enter incorrect answer 3"
                    id="incorrect_answer3"
                  />
                  {meta.error && meta.touched && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center m-6 rounded-2xl text-pink-300">
                      {meta.error}
                    </p>
                  )}
                </div>
              )}
            </Field>

            <div className="button-container items-center flex justify-center">
              {feedback && <p>{feedback}</p>}
              <button
                type="submit"
                className="submit-button w-[60%] bg-socskyblue hover:bg-sky-300 hover:text-white rounded-2xl px-4 py-6 text-foreground text-center text-black dark:text-black"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
