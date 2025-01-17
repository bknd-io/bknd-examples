import { Admin } from "bknd/ui"
import "bknd/dist/styles.css"

export default function AdminPage() {
   return <Admin config={{ basepath: "/admin" }} />
}