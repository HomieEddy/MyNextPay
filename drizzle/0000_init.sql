CREATE TABLE `bill_payment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`item_id` integer NOT NULL,
	`due_date` text NOT NULL,
	`paid_on` text NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `recurring_item`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bill_payment_item_due` ON `bill_payment` (`item_id`,`due_date`);--> statement-breakpoint
CREATE TABLE `entry` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kind` text NOT NULL,
	`description` text NOT NULL,
	`category` text DEFAULT 'Other' NOT NULL,
	`amount` integer NOT NULL,
	`date` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `recurring_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`category` text DEFAULT 'Other' NOT NULL,
	`amount` integer NOT NULL,
	`schedule_kind` text NOT NULL,
	`weekday` integer,
	`every_weeks` integer,
	`day_of_month` integer,
	`every_days` integer,
	`start_date` text NOT NULL,
	`auto_pay` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`anchor_payday` text NOT NULL,
	`pay_frequency` text NOT NULL,
	`pay_amount` integer NOT NULL,
	`mode` text DEFAULT 'simple' NOT NULL,
	`opening_balance` integer DEFAULT 0 NOT NULL,
	`opening_balance_date` text,
	`floor` integer DEFAULT 30000 NOT NULL,
	`low_balance_warning` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
