import { quickTips } from "@/lib/constants";
export default function handler(req, res) {
  res.status(200).json(quickTips)
}
