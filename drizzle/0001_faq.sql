CREATE TABLE "faq" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"createdByAdminId" uuid,
	"updatedByAdminId" uuid
);
--> statement-breakpoint
ALTER TABLE "faq" ADD CONSTRAINT "faq_createdByAdminId_admin_user_id_fk" FOREIGN KEY ("createdByAdminId") REFERENCES "public"."admin_user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faq" ADD CONSTRAINT "faq_updatedByAdminId_admin_user_id_fk" FOREIGN KEY ("updatedByAdminId") REFERENCES "public"."admin_user"("id") ON DELETE set null ON UPDATE no action;