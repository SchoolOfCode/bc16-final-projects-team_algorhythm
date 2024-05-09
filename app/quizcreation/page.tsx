import { Formik, Form, Field } from 'formik';
import { createClient } from "@/utils/supabase/server";
import * as yup from 'yup';


const supabase = createClient();

export default function QuizCreation() {


const QuizSchema = yup.object().shape({
        question: yup.string().max(120, "Too long!").required("Required."),
        answer: yup.string().max(100, "Too long!").required("Required."),
     });

const QuizValues = {
    question: "What is the capital of France?",
    answer: "Paris",
};


async function handleSubmit(values, { resetForm }) {
    const { question, answer } = values;
    try {
        const { error } = await supabase.from("contacts").insert({ question, answer });
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
    <Form>
        <Field name="name">
            {({ field, meta }) => (
                <div className="form-control">
                    <label mb="1.5" fontSize="sm" htmlFor="contact-name">
                        Name
                    </label>
                    <input {...field} placeholder="Enter name" id="contact-name" />
                    {meta.error && meta.touched && <p>{meta.error}</p>}
                </div>
            )}
        </Field>
        <Field name="email">
            {({ field, meta }) => (
                <div className="form-control">
                    <label mb="1.5" fontSize="sm" htmlFor="contact-email">
                        Email
                    </label>
                    <input {...field} placeholder="Enter email" id="contact-email" />
                    {meta.error && meta.touched && <p>{meta.error}</p>}
                </div>
            )}
        </Field>
        <Field name="body">
            {({ field, meta }) => (
                <div className="form-control">
                    <label mb="1.5" fontSize="sm" htmlFor="contact-body">
                        Body
                    </label>
                    <textarea
                        {...field}
                        id="contact-body"
                        placeholder="Describe what you are reaching out for."
                    />
                    {meta.error && meta.touched && <p>{meta.error}</p>}
                </div>
            )}
        </Field>

        <div className="button-container">
            <button type="submit" className="submit-button">
                {isSubmittingForm ? "Submitting..." : "Submit"}
            </button>
        </div>
    </Form>
</Formik>


    )
}