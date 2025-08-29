import type { Employee, EmployeeInfo } from '../src/types/employees';
import { defineMock } from 'vite-plugin-mock-dev-server'
import { useEmployeeValidation } from '../src/core/composables/useEmployeeValidation'


const designations = [
    'Data Analyst',
    'Software Engineer',
    'Product Manager',
    'UX Designer',
    'DevOps Specialist',
    'QA Engineer',
    // 'System Administrator',
    // 'Frontend Developer',
    // 'Backend Developer',
    // 'Full Stack Developer',
    // 'Mobile Developer',
    // 'Data Scientist',
    // 'Machine Learning Engineer',
    // 'Cloud Architect',
    // 'Security Engineer',
    // 'Database Administrator',
    // 'Network Engineer',
    // 'Technical Lead',
    // 'Scrum Master',
    // 'Business Analyst',
    // 'Digital Marketing Specialist',
    // 'Content Manager',
    // 'SEO Specialist',
    // 'HR Business Partner',
    // 'Finance Manager',
    // 'Sales Executive',
    // 'Customer Support Specialist',
    // 'Operations Manager',
    // 'Project Coordinator',
    // 'UI/UX Researcher',
    // 'AI Specialist',
    // 'Blockchain Developer'
];

const firstNames = [
    'John', 'Jane', 'Michael', 'Emily', 'David',
    'Sarah', 'Robert', 'Nancy', 'William', 'Elizabeth',
    'James', 'Jennifer', 'Richard', 'Lisa', 'Charles',
    'Mary', 'Thomas', 'Susan', 'Daniel', 'Karen',
    'Matthew', 'Jessica', 'Anthony', 'Sarah', 'Mark',
    'Laura', 'Paul', 'Amy', 'Steven', 'Rebecca',
    'Andrew', 'Michelle', 'Kevin', 'Linda', 'Brian',
    'Amanda', 'George', 'Melissa', 'Timothy', 'Stephanie'
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
    'Miller', 'Davis', 'Robinson', 'Wilson', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris',
    'Martin', 'Thompson', 'Garcia', 'Martinez', 'Clark',
    'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall',
    'Allen', 'Young', 'King', 'Wright', 'Scott',
    'Green', 'Baker', 'Adams', 'Nelson', 'Carter',
    'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips'
];

function generateRandomPhone(): string {
    const part1 = Math.floor(100 + Math.random() * 900);
    const part2 = Math.floor(100 + Math.random() * 900);
    const part3 = Math.floor(1000 + Math.random() * 9000);
    return `${part1}-${part2}-${part3}`;
}

function generateRandomDate(start: Date, end: Date): string {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString();
}

function generateEmail(name: string): string {
    const [firstName, lastName] = name.toLowerCase().split(' ');
    const separators = ['', '.', '_', '-'];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', `нфтвуч.com`];
    const randomNumber = Math.random() > 0.7 ? Math.floor(Math.random() * 100) : '';

    // Варианты генерации
    const patterns = [
        `${firstName}${lastName}${randomNumber}`,
        `${firstName}${separators[Math.floor(Math.random() * separators.length)]}${lastName}${randomNumber}`,
        `${firstName.charAt(0)}${lastName}${randomNumber}`,
        `${firstName}${lastName.charAt(0)}${randomNumber}`,
        `${firstName}${randomNumber}`,
        `${lastName}${randomNumber}`
    ];

    const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];

    return `${selectedPattern}@${domain}`;
}

function generateEmployee(): Employee {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const designation = designations[Math.floor(Math.random() * designations.length)];

    return {
        phone: generateRandomPhone(),
        designation,
        employeeCode: `${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(100 + Math.random() * 900)}`,
        avatar: `https://robohash.org/${Math.random().toString(36).substring(2, 15)}?set=set4&bgset=&size=200x200`,
        name,
        joiningDate: generateRandomDate(new Date(2020, 0, 1), new Date()),
        email: generateEmail(name),
        id: crypto.randomUUID(),
    };
}

function generateEmployees(count: number): Employee[] {
    return Array.from({ length: count }, () => generateEmployee());
}

function createEmployee(employeeInfo: EmployeeInfo): Employee {
    return { id: crypto.randomUUID(), ...employeeInfo }
}

// 50 случайных сотрудников
const employees = generateEmployees(70);

export default defineMock([
    {
        url: '/api/employees',
        body: () => employees,
        method: ['GET'],
        status: 200,
        delay: 1000,
        headers: {
            'Access-Control-Allow-Origin': '*', // Добавляем CORS-заголовок для локального ответа
        },
    },
    {
        url: '/api/employees/:id',
        method: 'DELETE',
        body: ({ params }) => {
            const employee = employees.find(e => e.id === params.id);
            if (!employee) throw { status: 404, body: { success: false, error: 'Employee not found' } }
            return employee
                ? { success: true, data: employee.id }
                : { success: false };
        },
        delay: 1000,
    },
    // {
    //     url: '/api/employees',
    //     body: ({ employeeInfo }: { employeeInfo: EmployeeInfo }) => {
    //         const validationData = useEmployeeValidation().validateEmployee(employeeInfo);
    //         const employee = createEmployee(employeeInfo)
    //         if (validationData.isValid) {
    //             employees.push(employee)
    //             return { success: true, data: employee };
    //         }
    //         else throw { status: 404, body: { success: false, error: `Employee is not valid - ${validationData.errors}` } }

    //     },
    //     method: 'POST',
    //     delay: 1000,
    // },
    {
  url: '/api/employees',
  method: 'POST',
  delay: 1000,
  body: ({ body }: { body: EmployeeInfo }) => {
    const validationData = useEmployeeValidation().validateEmployee(body);
    if (validationData.isValid) {
      const employee = createEmployee(body);
      employees.push(employee);
      return {
        status: 201, // Created
        body: { success: true, data: employee },
      };
    } else {
      return {
        status: 400, // Bad Request
        body: { success: false, error: `Employee is not valid - ${validationData.errors??[].join(', ')}` },
      };
    }
  },
}
])