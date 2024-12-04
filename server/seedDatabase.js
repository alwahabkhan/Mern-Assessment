// import { faker } from "@faker-js/faker";
// import User from "./model/userModel.js";

// const seedDatabase = async () => {
//     try {
//         console.log("Clearing existing data...");
//         await User.deleteMany();

//         const users = [];

//         for (let i = 0; i < 1000; i++) {
//             users.push({
//                 id: faker.string.uuid(),
//                 name: faker.person.fullName(),
//                 email: faker.internet.email({ provider: "example.com" }) + i,
//                 phone: faker.number.int({ min: 1000000000, max: 9999999999 }),
//                 role: faker.helpers.arrayElement(["User"]),
//                 addresses: [
//                     {
//                         addressline1: faker.location.streetAddress(),
//                         addressline2: faker.location.secondaryAddress(),
//                         city: faker.location.city(),
//                         state: faker.location.state(),
//                         country: faker.location.country(),
//                     },
//                 ],
//             });
//         }

//         console.log("Inserting 1000 users...");
//         await User.insertMany(users);

//         console.log("Seeding completed successfully!");
//         process.exit(0);
//     } catch (error) {
//         console.error("Error seeding database:", error);
//         process.exit(1);
//     }
// };

// export default seedDatabase;
