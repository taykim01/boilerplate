- This is a website development boilerplate using:

* Next.js
* Supabase
* OpenAI
* Shadcn
* Recoil

- How to generate Supabase type:

1. npm i supabase@">=1.8.1" --save-dev
2. npx supabase login
3. npx supabase init
4. npx supabase gen types --lang=typescript --project-id "$PROJECT_REF" --schema public > src/data/daos/database.types.ts

test
