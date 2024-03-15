import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const leads = [
    {
      name: "Chris",
      email: "test@gmail.com",
      phone: "123-456-7890",
      stage: "Nurturing",
      company: "ABC Tech",
      title: "CEO",
      amount: 10000,
      ownerName: "John",
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
      ownerName: "John",
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
      ownerName: "John",
      createdDate: new Date("2023-12-02"),
      modifiedDate: new Date("2023-12-02"),
      notes: "Hasn't been responding to calls.",
    },
  ];

  for (const lead of leads) {
    await prisma.lead.create({
      data: lead,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
