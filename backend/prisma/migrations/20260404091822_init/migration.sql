-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `listingDescription` TEXT NULL,
    ADD COLUMN `listingImageUrl` VARCHAR(191) NULL,
    ADD COLUMN `listingTitle` VARCHAR(191) NULL,
    ADD COLUMN `listingType` ENUM('OFFER', 'REQUEST') NULL;
