/*
  Warnings:

  - You are about to drop the column `description` on the `Item` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `description`,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL;
