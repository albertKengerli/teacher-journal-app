import { Field } from '../entities/field';

export const studentsFormConfig: Field[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Jack",
    required: true,
    validation: true,
    expression: /^[a-z ,.'-]+$/i,
    errorMessage: 'Only a-z, and special characters are allowed. Field shouldn\'t be empty',
  },
  {
    name: "surname",
    type: "text",
    label: "Last name",
    placeholder: "Black",
    required: true,
    validation: true,
    expression: /^[a-z ,.'-]+$/i,
    errorMessage: 'Only a-z, and special characters are allowed. Field shouldn\'t be empty',
  },
  {
    name: "address",
    type: "text",
    label: "Address",
    placeholder: "pr. Zhukova 2",
    required: false,
    validation: false,
  },
  {
    name: "description",
    type: "text-area",
    label: "Description",
    placeholder: "Good guy, works hard",
    required: false,
    validation: false,
  },
];
