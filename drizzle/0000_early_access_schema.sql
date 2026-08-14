CREATE TYPE "public"."social_platform" AS ENUM('x', 'linkedin');--> statement-breakpoint
CREATE TABLE "creators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"social_platform" "social_platform" NOT NULL,
	"social_handle" text NOT NULL,
	"social_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "investors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "creators_email_unique" ON "creators" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "investors_email_unique" ON "investors" USING btree ("email");