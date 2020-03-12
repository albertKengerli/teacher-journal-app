import { Student } from "../../common/entities/student";

export interface StudentsState {
  data: readonly Student[];
}

/*tslint:disable*/
export const initialStudentsState: StudentsState = {
  data: [
    {
      id: "0",
      name: 'Benson',
      surname: 'Kinney',
      address: 'Colonial Road, 37',
      description: 'Do incididunt excepteur ullamco ad magna sunt dolore aliquip aute.'
    },
    {
      id: "1",
      name: 'Aileen',
      surname: 'Pennington',
      address: 'Leonora Court, 22',
      description: 'Incididunt est sit amet enim ad.'
    },
  ],
};

// export const initialStudentsState: StudentsState = { data: []};
