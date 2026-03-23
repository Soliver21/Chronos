-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_listingId_fkey`;

-- DropIndex
DROP INDEX `Transaction_listingId_fkey` ON `Transaction`;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `listingDescription` TEXT NULL,
    ADD COLUMN `listingImageUrl` VARCHAR(191) NULL,
    ADD COLUMN `listingTitle` VARCHAR(191) NULL,
    ADD COLUMN `listingType` ENUM('OFFER', 'REQUEST') NULL,
    MODIFY `listingId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
