-- CreateTable
CREATE TABLE "process" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lists" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lists_id_key" ON "lists"("id");

-- AddForeignKey
ALTER TABLE "process" ADD CONSTRAINT "process_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
