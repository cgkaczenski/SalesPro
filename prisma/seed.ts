import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
  name: "John Doe",
  email: "john@test.com",
  password: "",
  role: "ADMIN",
  emailVerified: new Date(),
  Lead: {
    create: [
      {
        name: "Chris",
        email: "test@gmail.com",
        phone: "123-456-7890",
        stage: "Nurturing",
        company: "ABC Tech",
        title: "CEO",
        amount: 10000,
        createdDate: new Date("2024-03-02"),
        modifiedDate: new Date("2024-03-02"),
        notes: "Need to follow up.",
      },
      {
        name: "Morgan",
        email: "test2@gmail.com",
        phone: "123-456-7890",
        stage: "New",
        company: "Amco Company",
        title: "CTO",
        amount: 15000,
        createdDate: new Date("2024-03-010"),
        modifiedDate: new Date("2024-03-10"),
        notes:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        name: "Joe",
        email: "test3@gmail.com",
        phone: "123-456-7890",
        stage: "Proposal",
        company: "Old Tech Company",
        title: "Marketing Manager",
        amount: 45000,
        createdDate: new Date("2023-12-02"),
        modifiedDate: new Date("2023-12-02"),
        notes: "Hasn't been responding to calls.",
      },
    ],
  },
};

async function main() {
  console.log(`Start seeding ...`);

  const hashedPassword = await bcrypt.hash("example", 10);
  userData.password = hashedPassword;

  await prisma.user.create({
    data: userData,
  });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
