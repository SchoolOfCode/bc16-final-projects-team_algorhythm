"use client";
import { Formik, Form, Field } from "formik";
import { createClient } from "@supabase/supabase-js";
import * as yup from "yup";
import { useState } from "react";
import Image from "next/image";
import QuizCard from "@/components/QuizCard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function QuizSelection() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <QuizCard
          name="Quiz 1"
          description="Quiz Description"
          image="/soclogo.png"
        />
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quiz 2</h2>
            <p>Quiz Description</p>
          </div>
          <figure className="bg-sky-200">
            <Image src="/soclogo.png" alt="Quiz" width={200} height={200} />
          </figure>
        </div>
      </div>
    </>
  );
}
