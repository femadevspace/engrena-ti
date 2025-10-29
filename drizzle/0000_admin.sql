CREATE TABLE "admin_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"nickname" varchar(128) NOT NULL,
	"fullname" varchar(256) NOT NULL,
	"password_hash" varchar(256) NOT NULL,
	CONSTRAINT "admin_user_nickname_unique" UNIQUE("nickname")
);
