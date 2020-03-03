import { Field } from "../entities/field";

export const subjectsFormConfig: Field[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Mathematics",
    required: true,
    validation: true,
    expression: /^[a-z .-]+$/i,
    errorMessage: "Only a-z, space, ., - are allowed",
  },
  {
    name: "teacher",
    type: "text",
    label: "Teacher",
    placeholder: "M. Ivanovna",
    required: true,
    validation: true,
    expression: /^[a-z ,.'-]+$/i,
    errorMessage: "Only a-z, and special characters are allowed.",
  },
  {
    name: "address",
    type: "text",
    label: "Room",
    placeholder: "402",
    required: false,
    validation: true,
    expression: /[0-9]*/i,
    errorMessage: "Only 0-9 without spaces is valid room",
  },
  {
    name: "description",
    type: "text-area",
    label: "Description",
    placeholder: "Will blow your mind...",
    required: false,
    validation: false,
  },
];
