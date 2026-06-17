import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProblems } from "../hooks/useProblems.js";
import { parseProblemUrl } from "../utils/urlParser.js";

const TOPICS = [
  "Array",
  "String",
  "HashMap",
  "Stack",
  "Queue",
  "Linked List",
  "Tree",
  "Graph",
  "Heap",
  "Trie",
  "DP",
  "Greedy",
  "Backtracking",
  "Math",
  "Bit Manipulation",
];
const PATTERNS = [
  "Sliding Window",
  "Two Pointer",
  "HashMap",
  "Binary Search",
  "BFS",
  "DFS",
  "Recursion",
  "Backtracking",
  "Greedy",
  "DP - 1D",
  "DP - 2D",
  "Union Find",
  "Topological Sort",
  "Prefix Sum",
  "Monotonic Stack",
];

const empty = {
  url: "",
  title: "",
  platform: "",
  difficulty: "Medium",
  topic: "",
  pattern: "",
  confidence: "Medium",
  notes: "",
};

export default function AddProblem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { problems, addProblem, updateProblem } = useProblems();
  const editing = id ? problems.find((p) => p.id === id) : null;

  const [form, setForm] = useState(editing ? { ...editing } : empty);

  useEffect(() => {
    if (editing) setForm({ ...editing });
  }, [editing]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onUrl = (e) => {
    const url = e.target.value;
    set("url", url);
    if (editing) return;
    const { platform, title } = parseProblemUrl(url);
    setForm((f) => ({
      ...f,
      url,
      platform: f.platform || platform,
      title: f.title || title,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title is required");
    if (editing) {
      updateProblem(editing.id, form);
    } else {
      addProblem(form);
    }
    navigate("/library");
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>{editing ? "Edit Problem" : "Add a Problem"}</h1>
          <p className="muted">
            Paste the URL and we'll detect the platform & title.
          </p>
        </div>
      </div>

      <form className="form panel" onSubmit={onSubmit}>
        <label className="field span-2">
          <span>Problem URL</span>
          <input
            value={form.url}
            onChange={onUrl}
            placeholder="https://leetcode.com/problems/two-sum/"
          />
        </label>

        <label className="field span-2">
          <span>Title</span>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Two Sum"
          />
        </label>

        <label className="field">
          <span>Platform</span>
          <input
            value={form.platform}
            onChange={(e) => set("platform", e.target.value)}
            placeholder="LeetCode"
          />
        </label>

        <label className="field">
          <span>Difficulty</span>
          <select
            value={form.difficulty}
            onChange={(e) => set("difficulty", e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>

        <label className="field">
          <span>Topic</span>
          <input
            list="topics"
            value={form.topic}
            onChange={(e) => set("topic", e.target.value)}
            placeholder="Array"
          />
          <datalist id="topics">
            {TOPICS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </label>

        <label className="field">
          <span>Pattern</span>
          <input
            list="patterns"
            value={form.pattern}
            onChange={(e) => set("pattern", e.target.value)}
            placeholder="HashMap"
          />
          <datalist id="patterns">
            {PATTERNS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </label>

        <label className="field span-2">
          <span>Confidence</span>
          <div className="seg">
            {["Weak", "Medium", "Strong"].map((c) => (
              <button
                type="button"
                key={c}
                className={`seg-item ${form.confidence === c ? "active" : ""}`}
                onClick={() => set("confidence", c)}
              >
                {c}
              </button>
            ))}
          </div>
        </label>

        <label className="field span-2">
          <span>Personal Notes</span>
          <textarea
            rows="4"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Approach, gotchas, tricks..."
          />
        </label>

        <div className="form-actions span-2">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {editing ? "Save Changes" : "Save & Schedule"}
          </button>
        </div>
      </form>
    </div>
  );
}
