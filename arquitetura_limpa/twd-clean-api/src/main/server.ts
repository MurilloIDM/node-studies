import "module-alias/register";
import { app } from "@/main/config";

app.listen(3000, () => console.log("Server running at http://localhost:3000"));