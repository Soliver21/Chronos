/*
  Warnings:

  - You are about to drop the column `category` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerHour` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agreedHours` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_userId_fkey`;

-- DropIndex
DROP INDEX `Transaction_userId_fkey` ON `Transaction`;

-- AlterTable
ALTER TABLE `Listing` DROP COLUMN `category`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `estimatedHours` DOUBLE NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `pricePerHour` DOUBLE NOT NULL,
    MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `userId`,
    ADD COLUMN `agreedHours` DOUBLE NOT NULL,
    ADD COLUMN `cancelledAt` DATETIME(3) NULL,
    ADD COLUMN `clientId` INTEGER NOT NULL,
    ADD COLUMN `completedAt` DATETIME(3) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `providerId` INTEGER NOT NULL,
    ADD COLUMN `totalPrice` DOUBLE NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `User` ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `averageRating` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `balance` INTEGER NOT NULL DEFAULT 5,
    ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    MODIFY `trustLevel` ENUM('NEWCOMER', 'TRUSTED', 'VETERAN') NOT NULL DEFAULT 'NEWCOMER';

-- CreateTable
CREATE TABLE `ListingCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `ListingCategory_name_key`(`name`),
    UNIQUE INDEX `ListingCategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WebsiteReview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ListingCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WebsiteReview` ADD CONSTRAINT `WebsiteReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
