/* ============================================================
   Python Lab — curriculum
   Modules of tutorials (read + try) and labs (write + check).
   Lab `tests` run in the same namespace as the learner's code.
   Inside tests: _stdout = captured print output, _code = source.
   ============================================================ */
const CURRICULUM = [

// ================================================================
// MODULE 1 — FIRST STEPS
// ================================================================
{
  id: "m1",
  title: "First Steps",
  blurb: "What Python is, how to run it, and your very first lines of code.",
  lessons: [
  {
    id: "m1l1",
    type: "tutorial",
    title: "Hello, Python!",
    minutes: 5,
    content: [
      { p: "Welcome! 👋 Python is one of the most popular programming languages in the world — it runs websites, analyzes data, automates boring work, and powers AI. It's also famously beginner-friendly, because its code reads almost like English." },
      { p: "A program is just a list of instructions the computer follows from top to bottom. The most fundamental instruction is <code>print()</code> — it displays something on the screen." },
      { run: "print(\"Hello, world!\")" },
      { p: "Click <strong>▶ Run</strong> above (or press <strong>Ctrl+Enter</strong> inside the editor). The text between the quotes gets printed below the code. Every code box on this site is live — you can edit it and re-run it as many times as you like." },
      { h: "Anatomy of that one line" },
      { list: [
        "<code>print</code> — the name of a built-in <em>function</em> (a reusable command). You'll write your own functions later in this course!",
        "<code>( )</code> — parentheses hold what you give to the function.",
        "<code>\"Hello, world!\"</code> — text in quotes is called a <em>string</em>. Python treats it as data, not as instructions."
      ]},
      { h: "Programs run top to bottom" },
      { run: "print(\"First\")\nprint(\"Second\")\nprint(\"Third\")" },
      { tip: "Try reordering the three lines and running again. The output order always follows the code order — computers do exactly what you say, in the sequence you say it." },
      { warn: "Spelling and symbols matter. <code>Print(\"hi\")</code> with a capital P is an error — try it and read the error message. Learning to read errors calmly is a programming superpower." }
    ]
  },
  {
    id: "m1l2",
    type: "tutorial",
    title: "Quotes, comments & common errors",
    minutes: 6,
    content: [
      { h: "Single or double quotes — both work" },
      { run: "print('single quotes work')\nprint(\"double quotes work too\")\nprint(\"it's easiest to use double quotes when the text has an apostrophe\")" },
      { h: "Comments: notes for humans" },
      { p: "A line starting with <code>#</code> is a <em>comment</em>. Python ignores it completely — it exists to explain your code to humans (including future you)." },
      { run: "# This whole line is ignored by Python\nprint(\"But this line runs\")  # comments can also sit at the end of a line" },
      { h: "Printing several things at once" },
      { p: "Give <code>print()</code> multiple items separated by commas and it prints them with spaces in between:" },
      { run: "print(\"Python\", \"is\", \"fun\")\nprint(\"2 + 2 is\", 2 + 2)" },
      { p: "Notice the second line: <code>2 + 2</code> has no quotes, so Python <em>calculates</em> it instead of printing it literally. Quotes = text. No quotes = something Python evaluates." },
      { h: "Meet your first errors" },
      { p: "Errors are not failures — they're feedback. Run this broken line and read the message:" },
      { run: "print(\"oops — this string never ends" },
      { p: "Python says <code>SyntaxError</code> and points near the problem. Fix it by adding the closing quote and parenthesis, then run again. You just debugged your first program. 🐛" }
    ]
  },
  {
    id: "m1l3",
    type: "lab",
    title: "Lab: Your name card",
    minutes: 5,
    objective: "Use <code>print()</code> three times to introduce yourself: your name, where you're from, and one thing you want to build with Python.",
    content: [
      { p: "Write <strong>three separate print statements</strong>, each producing one line of output. For example:" },
      { code: "My name is Ada\nI am from London\nI want to build a weather app" },
      { p: "The exact words are up to you — the checker just verifies you printed <strong>at least 3 non-empty lines</strong> using three print calls." }
    ],
    starter: "# Line 1: your name\n\n# Line 2: where you're from\n\n# Line 3: something you want to build\n",
    tests: `
_lines = [l for l in _stdout.split("\\n") if l.strip()]
assert len(_lines) >= 3, f"I only see {len(_lines)} non-empty line(s) of output — print three lines, one per print()."
assert _code.count("print") >= 3, "Use three separate print() calls, one for each line."
`,
    hints: [
      "Each <code>print(\"...\")</code> produces exactly one line of output.",
      "Make sure your text is inside quotes: <code>print(\"My name is Sam\")</code>."
    ],
    solution: "print(\"My name is Sam\")\nprint(\"I am from Ohio\")\nprint(\"I want to build a game\")"
  },
  {
    id: "m1l4",
    type: "lab",
    title: "Lab: Fix the bugs",
    minutes: 6,
    objective: "The program below has <strong>three bugs</strong>. Fix them all so it prints exactly: <code>I am learning Python</code> and <code>Debugging makes me stronger</code>.",
    content: [
      { p: "Run the code first and <em>read the error message</em> — it tells you the line number and what confused Python. Fix one bug, run again, repeat. This run-read-fix loop is exactly how professionals work." },
      { list: [
        "Bug 1: Python is case-sensitive — the print function is all lowercase.",
        "Bug 2: strings need matching opening <em>and</em> closing quotes.",
        "Bug 3: every opening parenthesis needs a closing one."
      ]}
    ],
    starter: "Print(\"I am learning Python\")\nprint(\"Debugging makes me stronger)\nprint(\"Almost there\"\n",
    tests: `
_lines = [l.strip() for l in _stdout.split("\\n") if l.strip()]
assert "I am learning Python" in _lines, 'Line 1 should print exactly: I am learning Python'
assert "Debugging makes me stronger" in _lines, 'Line 2 should print exactly: Debugging makes me stronger'
`,
    hints: [
      "<code>Print</code> ➜ <code>print</code> (lowercase p).",
      "The second line is missing a closing double quote before the parenthesis.",
      "The third line is missing its closing parenthesis <code>)</code>."
    ],
    solution: "print(\"I am learning Python\")\nprint(\"Debugging makes me stronger\")\nprint(\"Almost there\")"
  }
  ]
},

// ================================================================
// MODULE 2 — VARIABLES & DATA TYPES
// ================================================================
{
  id: "m2",
  title: "Variables & Data Types",
  blurb: "Store information in named boxes and learn the four core types of data.",
  lessons: [
  {
    id: "m2l1",
    type: "tutorial",
    title: "Variables: naming your data",
    minutes: 7,
    content: [
      { p: "A <em>variable</em> is a name that points to a value — like a labeled box you can store things in. You create one with <code>=</code>, which means <strong>\"assign\"</strong> (not \"equals\" like in math)." },
      { run: "name = \"Ada\"\nage = 36\n\nprint(name)\nprint(age)" },
      { p: "Once a value has a name, you can use that name anywhere. Notice <code>print(name)</code> has no quotes — we want the <em>value inside the box</em>, not the literal text \"name\"." },
      { h: "Variables can change" },
      { run: "score = 0\nprint(score)\n\nscore = 10        # the box now holds 10\nprint(score)\n\nscore = score + 5  # take the current value, add 5, store it back\nprint(score)" },
      { p: "That last line is worth staring at: <code>score = score + 5</code>. Python first works out the right side (<code>10 + 5</code>), then stores the result back into <code>score</code>." },
      { h: "Naming rules" },
      { list: [
        "Use letters, numbers and underscores: <code>first_name</code>, <code>player2</code>.",
        "Can't start with a number: <code>2player</code> ❌",
        "No spaces — use underscores: <code>high score</code> ❌ ➜ <code>high_score</code> ✅",
        "Case matters: <code>Name</code> and <code>name</code> are different variables.",
        "Pick names that describe the data. <code>x = 19.99</code> works, but <code>price = 19.99</code> tells a story."
      ]},
      { warn: "Using a variable before creating it causes a <code>NameError</code>. Try running just <code>print(points)</code> — Python has no box called <code>points</code> yet." },
      { h: "Spacing matters (yes, really)" },
      { p: "Professional Python has a style guide (PEP 8), and its first habit is <strong>clean spacing</strong>: one space on each side of <code>=</code> and comparison signs, and a space after every comma. So <code>x = 5</code>, not <code>x=5</code>; <code>(a, b)</code>, not <code>(a,b)</code>. Indentation is always <strong>4 spaces</strong> — never tabs." },
      { tip: "The labs on this site <em>require</em> this spacing — the checker will point out exactly which line to tidy. It's not just cosmetic: consistent spacing makes bugs visible and prevents indentation errors before they happen." }
    ]
  },
  {
    id: "m2l2",
    type: "tutorial",
    title: "The four core data types",
    minutes: 8,
    content: [
      { p: "Every value in Python has a <em>type</em>. The four you'll use constantly:" },
      { list: [
        "<code>str</code> — a string: text in quotes, like <code>\"hello\"</code>",
        "<code>int</code> — an integer: a whole number, like <code>42</code>",
        "<code>float</code> — a decimal number, like <code>3.14</code>",
        "<code>bool</code> — a boolean: <code>True</code> or <code>False</code> (capitalized!)"
      ]},
      { p: "The built-in <code>type()</code> function tells you what type a value is:" },
      { run: "print(type(\"hello\"))\nprint(type(42))\nprint(type(3.14))\nprint(type(True))" },
      { h: "Why types matter" },
      { p: "The same operator can behave differently depending on type. <code>+</code> adds numbers but <em>joins</em> strings:" },
      { run: "print(2 + 2)          # numbers: addition\nprint(\"2\" + \"2\")      # strings: joined together!\nprint(\"ha\" * 3)       # strings can even be repeated" },
      { h: "Converting between types" },
      { p: "Use <code>int()</code>, <code>float()</code>, and <code>str()</code> to convert:" },
      { run: "text = \"25\"\nnumber = int(text)      # \"25\" (string) -> 25 (int)\nprint(number + 5)\n\nprice = 19.99\nlabel = str(price)      # 19.99 (float) -> \"19.99\" (string)\nprint(\"Price: \" + label)" },
      { warn: "Mixing types incorrectly is a classic beginner error. Try <code>print(\"Age: \" + 25)</code> — Python refuses to glue a string to an int. Convert first: <code>print(\"Age: \" + str(25))</code>. (The next lesson shows a much nicer way.)" }
    ]
  },
  {
    id: "m2l3",
    type: "tutorial",
    title: "f-strings: text + variables, beautifully",
    minutes: 6,
    content: [
      { p: "You'll constantly want to mix variables into text. The modern Python way is the <em>f-string</em>: put an <code>f</code> before the opening quote, then drop variables inside curly braces <code>{ }</code>." },
      { run: "name = \"Ada\"\nlanguage = \"Python\"\n\nprint(f\"Hi {name}, welcome to {language}!\")" },
      { p: "Python replaces each <code>{...}</code> with the variable's value. No plus signs, no <code>str()</code> conversions — it just works, even with numbers:" },
      { run: "apples = 3\nprice = 0.5\n\nprint(f\"{apples} apples cost {apples * price} dollars\")" },
      { p: "Yes — you can put whole expressions like <code>apples * price</code> inside the braces." },
      { h: "Formatting numbers" },
      { p: "Add <code>:.2f</code> inside the braces to show a number with exactly 2 decimal places (perfect for money):" },
      { run: "total = 7.5\nprint(f\"Total: ${total:.2f}\")" },
      { tip: "Forgot the <code>f</code>? Then the braces print literally: <code>\"Hi {name}\"</code>. If you ever see curly braces in your output, check for a missing <code>f</code>." }
    ]
  },
  {
    id: "m2l4",
    type: "lab",
    title: "Lab: About-me variables",
    minutes: 7,
    objective: "Create four variables — <code>name</code> (str), <code>age</code> (int), <code>height</code> (float), and <code>likes_python</code> (bool) — then print one sentence that uses them.",
    content: [
      { p: "Requirements checked by the grader:" },
      { list: [
        "<code>name</code> holds a string (your name)",
        "<code>age</code> holds a whole number (an <code>int</code>, not a string!)",
        "<code>height</code> holds a decimal number (a <code>float</code>, e.g. 1.75)",
        "<code>likes_python</code> holds <code>True</code> or <code>False</code>",
        "You print at least one line that includes your name and age (an f-string is perfect)"
      ]}
    ],
    starter: "# Create the four variables\n\n\n# Print a sentence about yourself using them\n",
    tests: `
assert "name" in globals(), "Create a variable called name."
assert isinstance(name, str) and len(name) > 0, "name should be a non-empty string (text in quotes)."
assert "age" in globals(), "Create a variable called age."
assert isinstance(age, int) and not isinstance(age, bool), "age should be an int — a number WITHOUT quotes, like 25."
assert "height" in globals(), "Create a variable called height."
assert isinstance(height, float), "height should be a float — a decimal number like 1.75."
assert "likes_python" in globals(), "Create a variable called likes_python."
assert isinstance(likes_python, bool), "likes_python should be True or False (no quotes, capitalized)."
assert name in _stdout, "Print a sentence that includes your name variable."
assert str(age) in _stdout, "Print a sentence that includes your age variable."
`,
    hints: [
      "Strings need quotes: <code>name = \"Sam\"</code>. Numbers don't: <code>age = 25</code>.",
      "A float needs a decimal point: <code>height = 1.75</code>. Booleans are <code>True</code>/<code>False</code> with a capital letter and no quotes.",
      "Print with an f-string: <code>print(f\"I'm {name} and I'm {age}\")</code>."
    ],
    solution: "name = \"Sam\"\nage = 25\nheight = 1.75\nlikes_python = True\n\nprint(f\"I'm {name}, I'm {age} years old and {height}m tall.\")"
  },
  {
    id: "m2l5",
    type: "lab",
    title: "Lab: Mad libs machine",
    minutes: 6,
    objective: "Use an f-string with the three given variables to print exactly: <code>The brave tiger loves to dance.</code>",
    content: [
      { p: "The three variables are already created for you in the starter code. Your job: <strong>one</strong> <code>print()</code> with <strong>one</strong> f-string that produces the sentence — then try changing the variable values and re-running to generate silly new sentences. That's the whole point of variables: change the data, not the sentence." }
    ],
    starter: "adjective = \"brave\"\nanimal = \"tiger\"\nverb = \"dance\"\n\n# Print: The brave tiger loves to dance.\n# (build it from the variables — don't type the words directly!)\n",
    tests: `
_lines = [l.strip() for l in _stdout.split("\\n") if l.strip()]
assert "The brave tiger loves to dance." in _lines, "Expected the exact line: The brave tiger loves to dance. (check spacing and the final period)"
assert 'f"' in _code or "f'" in _code, "Use an f-string (a quote with an f in front) rather than gluing strings together."
assert "{adjective}" in _code and "{animal}" in _code and "{verb}" in _code, "Use all three variables inside the f-string braces: {adjective}, {animal}, {verb}."
`,
    hints: [
      "Pattern: <code>print(f\"... {variable} ...\")</code>.",
      "The sentence is: The <code>{adjective}</code> <code>{animal}</code> loves to <code>{verb}</code>. — mind the final period!"
    ],
    solution: "adjective = \"brave\"\nanimal = \"tiger\"\nverb = \"dance\"\n\nprint(f\"The {adjective} {animal} loves to {verb}.\")"
  }
  ]
},

// ================================================================
// MODULE 3 — NUMBERS, MATH & INPUT
// ================================================================
{
  id: "m3",
  title: "Numbers, Math & Input",
  blurb: "Do real calculations, meet every math operator, and ask the user questions.",
  lessons: [
  {
    id: "m3l1",
    type: "tutorial",
    title: "Math operators",
    minutes: 7,
    content: [
      { p: "Python is a spectacular calculator. Here's the full toolbox:" },
      { run: "print(7 + 3)    # addition       -> 10\nprint(7 - 3)    # subtraction    -> 4\nprint(7 * 3)    # multiplication -> 21\nprint(7 / 3)    # division       -> 2.333... (always a float!)\nprint(7 // 3)   # floor division -> 2  (drops the remainder)\nprint(7 % 3)    # modulo         -> 1  (JUST the remainder)\nprint(7 ** 2)   # power          -> 49 (7 squared)" },
      { h: "The two weird ones: // and %" },
      { p: "<code>//</code> answers <em>\"how many whole times does it fit?\"</em> and <code>%</code> answers <em>\"what's left over?\"</em>. Together they're perfect for questions like \"135 minutes is how many hours and minutes?\":" },
      { run: "total_minutes = 135\nhours = total_minutes // 60\nminutes = total_minutes % 60\nprint(f\"{hours} hours and {minutes} minutes\")" },
      { tip: "<code>%</code> is also the classic even/odd test: a number is even when <code>number % 2</code> is <code>0</code> — dividing by 2 leaves no remainder." },
      { h: "Order of operations" },
      { p: "Python follows math rules (PEMDAS). Use parentheses to control — or just clarify — the order:" },
      { run: "print(2 + 3 * 4)      # 14, not 20\nprint((2 + 3) * 4)    # 20" }
    ]
  },
  {
    id: "m3l2",
    type: "tutorial",
    title: "Updating values & rounding",
    minutes: 6,
    content: [
      { h: "Shortcut operators" },
      { p: "Updating a variable based on its current value is so common that Python has shortcuts: <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>." },
      { run: "score = 100\nscore += 20   # same as: score = score + 20\nprint(score)\n\nscore -= 50   # same as: score = score - 50\nprint(score)" },
      { h: "Rounding" },
      { p: "<code>round()</code> rounds a number. Give it a second value to say how many decimal places to keep:" },
      { run: "print(round(3.14159))      # -> 3\nprint(round(3.14159, 2))   # -> 3.14\nprint(round(2.5 * 3.3, 1)) # you can round any expression" },
      { tip: "Remember from Module 2: for <em>display</em> purposes, f-strings can format too — <code>f\"{price:.2f}\"</code> always shows two decimals, even trailing zeros like <code>7.50</code>." }
    ]
  },
  {
    id: "m3l3",
    type: "tutorial",
    title: "Asking the user: input()",
    minutes: 6,
    content: [
      { p: "Programs get interesting when they react to a person. <code>input()</code> pauses the program, asks the user a question, and hands you whatever they typed." },
      { p: "On this site, <code>input()</code> opens a small popup box in your browser. Run this and answer the question:" },
      { run: "name = input(\"What is your name? \")\nprint(f\"Nice to meet you, {name}!\")" },
      { h: "input() always gives you a string" },
      { p: "Even if the user types <code>21</code>, you receive the <em>string</em> <code>\"21\"</code>. Convert it with <code>int()</code> or <code>float()</code> before doing math:" },
      { run: "age = input(\"How old are you? \")\nage = int(age)   # convert the text to a real number\nprint(f\"Next year you will be {age + 1}!\")" },
      { warn: "If you forget the conversion, <code>age + 1</code> crashes with a <code>TypeError</code> — Python won't add a number to text. This is one of the most common beginner bugs in existence. 🐛" },
      { p: "Because our automated lab checker can't type into popups, <strong>labs on this site give you variables instead of using input()</strong> — but everything you build would work the same way with real user input." }
    ]
  },
  {
    id: "m3l4",
    type: "lab",
    title: "Lab: Tip calculator",
    minutes: 8,
    objective: "Split the bill! Compute the total with tip, then the amount per person, and print the per-person amount formatted to 2 decimal places.",
    content: [
      { p: "Using the given variables, calculate:" },
      { list: [
        "<code>total</code> — the bill plus the tip. (18% tip means multiplying the bill by <code>1.18</code>, or adding <code>bill * 0.18</code>.)",
        "<code>per_person</code> — the total split evenly between the people.",
        "Print a line containing the per-person amount rounded/formatted to 2 decimals — it should contain <code>24.93</code>."
      ]}
    ],
    starter: "bill = 84.50\ntip_percent = 18\npeople = 4\n\n# 1) total = bill plus the tip\n\n# 2) per_person = total split between people\n\n# 3) print it, formatted to 2 decimal places\n",
    tests: `
import math
assert "total" in globals(), "Create a variable called total."
assert math.isclose(total, 99.71, rel_tol=1e-9), f"total should be 99.71 (84.50 plus 18%), but yours is {total}."
assert "per_person" in globals(), "Create a variable called per_person."
assert math.isclose(per_person, 24.9275, rel_tol=1e-9), f"per_person should be total / people = 24.9275, but yours is {per_person}."
assert "24.93" in _stdout, "Print the per-person amount with 2 decimal places (24.93). Try an f-string with :.2f"
`,
    hints: [
      "Tip as a fraction: <code>tip_percent / 100</code>. So <code>total = bill * (1 + tip_percent / 100)</code>.",
      "<code>per_person = total / people</code>.",
      "Format with <code>print(f\"Each person pays ${per_person:.2f}\")</code>."
    ],
    solution: "bill = 84.50\ntip_percent = 18\npeople = 4\n\ntotal = bill * (1 + tip_percent / 100)\nper_person = total / people\n\nprint(f\"Each person pays ${per_person:.2f}\")"
  },
  {
    id: "m3l5",
    type: "lab",
    title: "Lab: The time splitter",
    minutes: 7,
    objective: "Convert <code>total_minutes</code> into hours and leftover minutes using <code>//</code> and <code>%</code>, then print the result.",
    content: [
      { p: "A movie is <code>total_minutes = 347</code> minutes long. Create:" },
      { list: [
        "<code>hours</code> — how many <em>whole</em> hours fit into 347 minutes",
        "<code>minutes</code> — the minutes left over",
        "Print a sentence containing both, e.g. <code>5 hours and 47 minutes</code>"
      ]},
      { p: "No calculators allowed — make Python do the work with <code>//</code> and <code>%</code>. 😉" }
    ],
    starter: "total_minutes = 347\n\n# hours = ?\n# minutes = ?\n\n# print the result\n",
    tests: `
assert "hours" in globals(), "Create a variable called hours."
assert hours == 5, f"hours should be 5 (use total_minutes // 60), but yours is {hours}."
assert "minutes" in globals(), "Create a variable called minutes."
assert minutes == 47, f"minutes should be 47 (use total_minutes % 60), but yours is {minutes}."
assert "//" in _code, "Use floor division // to get the whole hours."
assert "%" in _code, "Use the modulo operator % to get the leftover minutes."
assert "5" in _stdout and "47" in _stdout, "Print a sentence that includes both numbers."
`,
    hints: [
      "<code>//</code> tells you how many whole 60s fit: <code>347 // 60</code> ➜ 5.",
      "<code>%</code> tells you what's left: <code>347 % 60</code> ➜ 47.",
      "Finish with <code>print(f\"{hours} hours and {minutes} minutes\")</code>."
    ],
    solution: "total_minutes = 347\n\nhours = total_minutes // 60\nminutes = total_minutes % 60\n\nprint(f\"{hours} hours and {minutes} minutes\")"
  }
  ]
},

// ================================================================
// MODULE 4 — MAKING DECISIONS
// ================================================================
{
  id: "m4",
  title: "Making Decisions",
  blurb: "Teach your programs to choose: if, elif, else, and combining conditions.",
  lessons: [
  {
    id: "m4l1",
    type: "tutorial",
    title: "if, elif, else",
    minutes: 9,
    content: [
      { p: "So far your programs run every line, always. Real programs <em>decide</em>: <strong>if</strong> the password is right, log in; <strong>otherwise</strong>, show an error. In Python that's the <code>if</code> statement." },
      { run: "temperature = 35\n\nif temperature > 30:\n    print(\"It's hot today! 🥵\")\n\nprint(\"This line always runs\")" },
      { h: "The rules of the block" },
      { list: [
        "The <code>if</code> line ends with a colon <code>:</code>",
        "The lines that belong to the <code>if</code> are <strong>indented 4 spaces</strong>. Indentation is not decoration in Python — it's how Python knows what's inside the if.",
        "When the condition is <code>False</code>, the indented block is skipped entirely."
      ]},
      { p: "Change <code>temperature</code> to <code>20</code> above and re-run — the hot message disappears, the last line still prints." },
      { h: "else — the \"otherwise\" branch" },
      { run: "age = 15\n\nif age >= 18:\n    print(\"You can vote!\")\nelse:\n    print(f\"Not yet — come back in {18 - age} years.\")" },
      { h: "elif — checking several possibilities" },
      { p: "<code>elif</code> (\"else if\") lets you test conditions in order. Python runs the <em>first</em> branch that matches and skips the rest:" },
      { run: "score = 87\n\nif score >= 90:\n    print(\"Grade: A\")\nelif score >= 80:\n    print(\"Grade: B\")\nelif score >= 70:\n    print(\"Grade: C\")\nelse:\n    print(\"Grade: F\")" },
      { h: "Comparison operators" },
      { list: [
        "<code>==</code> equal to &nbsp;(two equals signs — <code>=</code> alone means assign!)",
        "<code>!=</code> not equal to",
        "<code>&gt;</code> greater than, <code>&lt;</code> less than",
        "<code>&gt;=</code> greater or equal, <code>&lt;=</code> less or equal"
      ]},
      { warn: "Writing <code>if score = 90:</code> (one equals sign) is a syntax error. Comparing always uses <code>==</code>." }
    ]
  },
  {
    id: "m4l2",
    type: "tutorial",
    title: "Combining conditions: and, or, not",
    minutes: 7,
    content: [
      { p: "Conditions can be combined with plain English words:" },
      { list: [
        "<code>and</code> — both sides must be True",
        "<code>or</code> — at least one side must be True",
        "<code>not</code> — flips True to False and back"
      ]},
      { run: "age = 22\nhas_ticket = True\n\nif age >= 18 and has_ticket:\n    print(\"Welcome to the concert!\")\nelse:\n    print(\"Sorry, no entry.\")" },
      { run: "day = \"saturday\"\n\nif day == \"saturday\" or day == \"sunday\":\n    print(\"It's the weekend! 🎉\")\nelse:\n    print(\"Back to work.\")" },
      { h: "Conditions are just bool values" },
      { p: "A comparison like <code>age >= 18</code> <em>evaluates</em> to <code>True</code> or <code>False</code> — the same <code>bool</code> type from Module 2. You can print them or store them in variables:" },
      { run: "age = 22\nis_adult = age >= 18\nprint(is_adult)\nprint(not is_adult)\nprint(10 > 5 and 3 > 7)" },
      { tip: "Since <code>has_ticket</code> is already <code>True</code>/<code>False</code>, write <code>if has_ticket:</code> — not <code>if has_ticket == True:</code>. Both work, but the first reads like English." }
    ]
  },
  {
    id: "m4l3",
    type: "lab",
    title: "Lab: Grade assigner",
    minutes: 8,
    objective: "Use <code>if</code>/<code>elif</code>/<code>else</code> to print the letter grade for <code>score</code>: 90+ → A, 80–89 → B, 70–79 → C, 60–69 → D, below 60 → F.",
    content: [
      { p: "Print <strong>exactly one line</strong> in the format <code>Grade: B</code>. The starter sets <code>score = 87</code>, so the correct output is <code>Grade: B</code> — but your code must work for <em>any</em> score. After it passes, change the score to 95, 73, 60, 12 and re-run to convince yourself. (The checker also re-runs your logic with different scores — hardcoding won't fool it! 😄)" }
    ],
    starter: "score = 87\n\n# your if / elif / else chain here\n",
    tests: `
_lines = [l.strip() for l in _stdout.split("\\n") if l.strip()]
assert "Grade: B" in _lines, f"With score = 87 your program should print 'Grade: B'. Your output was: {_lines}"
assert "elif" in _code, "Use elif to chain the checks (if / elif / elif / ... / else)."
import re as _re
_m = _re.search(r"score\\s*=\\s*87", _code)
assert _m, "Keep the line 'score = 87' at the top so the checker can test your logic."
_reruns = {95: "A", 73: "C", 65: "D", 12: "F"}
for _s, _expected in _reruns.items():
    _test_code = _re.sub(r"score\\s*=\\s*87", f"score = {_s}", _code, count=1)
    _g = {}
    import io as _io, contextlib as _cl
    _buf = _io.StringIO()
    with _cl.redirect_stdout(_buf):
        exec(_test_code, _g)
    _out = _buf.getvalue()
    assert f"Grade: {_expected}" in _out, f"With score = {_s}, expected 'Grade: {_expected}' but your program printed: {_out.strip()!r}"
`,
    hints: [
      "Start from the top grade and work down: <code>if score >= 90:</code> ... <code>elif score >= 80:</code> ...",
      "Because elif only runs when earlier checks failed, <code>elif score >= 80:</code> already means \"between 80 and 89\".",
      "Each branch prints one thing: <code>print(\"Grade: B\")</code>. End with a plain <code>else:</code> for F."
    ],
    solution: "score = 87\n\nif score >= 90:\n    print(\"Grade: A\")\nelif score >= 80:\n    print(\"Grade: B\")\nelif score >= 70:\n    print(\"Grade: C\")\nelif score >= 60:\n    print(\"Grade: D\")\nelse:\n    print(\"Grade: F\")"
  },
  {
    id: "m4l4",
    type: "lab",
    title: "Lab: The bouncer bot",
    minutes: 8,
    objective: "Combine conditions with <code>and</code>/<code>or</code> to decide who gets into the club.",
    content: [
      { p: "The rules of Club Python:" },
      { list: [
        "A person gets in if they are <strong>18 or older AND have an ID</strong> — print <code>Welcome in!</code>",
        "…they also get in, regardless of anything, if they are <strong>on the VIP list</strong> — print <code>Welcome in!</code>",
        "Everyone else: print <code>Sorry, not tonight.</code>"
      ]},
      { p: "With the starter values (age 17, has ID, not VIP) the correct output is <code>Sorry, not tonight.</code> The checker will re-run your logic with other combinations, so express the <em>rules</em>, don't hardcode the answer." }
    ],
    starter: "age = 17\nhas_id = True\nis_vip = False\n\n# your decision logic here\n",
    tests: `
_lines = [l.strip() for l in _stdout.split("\\n") if l.strip()]
assert "Sorry, not tonight." in _lines, f"With age=17, has_id=True, is_vip=False the output should be 'Sorry, not tonight.' — your output: {_lines}"
assert "and" in _code, "Use the 'and' keyword to require BOTH age >= 18 AND has_id."
assert "or" in _code, "Use the 'or' keyword to let VIPs in no matter what."
import io as _io, contextlib as _cl, re as _re
_cases = [
    (20, True,  False, "Welcome in!"),
    (17, True,  True,  "Welcome in!"),
    (30, False, False, "Sorry, not tonight."),
    (16, False, False, "Sorry, not tonight."),
]
for _a, _h, _v, _expected in _cases:
    _test_code = _re.sub(r"age\\s*=\\s*17", f"age = {_a}", _code, count=1)
    _test_code = _re.sub(r"has_id\\s*=\\s*True", f"has_id = {_h}", _test_code, count=1)
    _test_code = _re.sub(r"is_vip\\s*=\\s*False", f"is_vip = {_v}", _test_code, count=1)
    _g = {}
    _buf = _io.StringIO()
    with _cl.redirect_stdout(_buf):
        exec(_test_code, _g)
    _out = _buf.getvalue()
    assert _expected in _out, f"With age={_a}, has_id={_h}, is_vip={_v}: expected '{_expected}' but got: {_out.strip()!r}"
`,
    hints: [
      "The whole entry rule in one condition: <code>(age >= 18 and has_id) or is_vip</code>.",
      "One <code>if</code> with that condition, one <code>else</code> — two prints total.",
      "Keep the three starter variable lines unchanged so the checker can swap in test values."
    ],
    solution: "age = 17\nhas_id = True\nis_vip = False\n\nif (age >= 18 and has_id) or is_vip:\n    print(\"Welcome in!\")\nelse:\n    print(\"Sorry, not tonight.\")"
  }
  ]
},

// ================================================================
// MODULE 5 — LOOPS
// ================================================================
{
  id: "m5",
  title: "Loops",
  blurb: "Make the computer repeat work for you — for loops, while loops, and the accumulator pattern.",
  lessons: [
  {
    id: "m5l1",
    type: "tutorial",
    title: "for loops & range()",
    minutes: 9,
    content: [
      { p: "Computers shine at repetition. Instead of writing <code>print()</code> a hundred times, you write a <em>loop</em> once:" },
      { run: "for i in range(5):\n    print(f\"Jump number {i}\")" },
      { h: "How it works" },
      { list: [
        "<code>range(5)</code> produces the numbers <code>0, 1, 2, 3, 4</code> — it starts at 0 and <strong>stops before</strong> 5.",
        "<code>i</code> is a normal variable that takes each value in turn (name it anything you like).",
        "The indented block runs once per value — 5 times here."
      ]},
      { h: "Controlling the range" },
      { run: "for n in range(1, 6):      # start at 1, stop before 6\n    print(n)\n\nfor n in range(0, 20, 5):  # third value = step size\n    print(n)" },
      { h: "Looping over a string" },
      { p: "<code>for</code> can walk through anything that has items — including the characters of a string:" },
      { run: "for letter in \"Python\":\n    print(letter)" },
      { tip: "Loop + f-string = instant times table: try <code>for i in range(1, 11): print(f\"7 x {i} = {7 * i}\")</code> in any editor on this page." }
    ]
  },
  {
    id: "m5l2",
    type: "tutorial",
    title: "while loops & the accumulator pattern",
    minutes: 9,
    content: [
      { p: "A <code>for</code> loop repeats a known number of times. A <code>while</code> loop repeats <em>as long as a condition stays True</em> — \"keep going until something changes\":" },
      { run: "battery = 100\n\nwhile battery > 0:\n    print(f\"Battery at {battery}%\")\n    battery -= 25\n\nprint(\"Battery dead! 🪫\")" },
      { warn: "Inside a <code>while</code> loop, <em>something must change</em> or the condition never becomes False and the loop runs forever (freezing this page — if that happens, just reload it). The <code>battery -= 25</code> line is what saves us here." },
      { h: "The accumulator pattern" },
      { p: "The single most useful loop technique: create a variable <em>before</em> the loop, then update it <em>inside</em> the loop. This is how you sum, count, and build things up:" },
      { run: "total = 0\n\nfor price in range(1, 6):   # pretend prices: 1, 2, 3, 4, 5\n    total += price\n    print(f\"After adding {price}, total is {total}\")\n\nprint(f\"Final total: {total}\")" },
      { p: "Read it slowly: <code>total</code> starts at 0 and <em>accumulates</em> each value. You'll use this pattern in the labs — and for the rest of your programming life." },
      { h: "break — the emergency exit" },
      { run: "for n in range(1, 100):\n    if n * n > 50:\n        print(f\"{n} squared is {n * n} — that's over 50, stopping!\")\n        break\n    print(f\"{n} squared is {n * n}\")" }
    ]
  },
  {
    id: "m5l3",
    type: "lab",
    title: "Lab: Sum 1 to 100",
    minutes: 7,
    objective: "Use a loop and the accumulator pattern to add up every number from 1 to 100, storing the result in <code>total</code>.",
    content: [
      { p: "The mathematician Gauss famously did this in his head as a schoolboy. You have a computer — make it do the work:" },
      { list: [
        "Create <code>total = 0</code> before the loop",
        "Loop over <code>range(1, 101)</code> (remember: the stop value is not included!)",
        "Add each number to <code>total</code> inside the loop",
        "Print the final total after the loop"
      ]},
      { p: "No fair using Python's built-in <code>sum()</code> or typing the answer directly — the checker is watching. 👀" }
    ],
    starter: "total = 0\n\n# your loop here\n\nprint(total)\n",
    tests: `
assert "total" in globals(), "Create a variable called total."
assert total == 5050, f"total should end up as 5050, but yours is {total}. Check your range — range(1, 101) includes 100."
assert "for" in _code or "while" in _code, "Use a loop (for or while) to do the adding."
assert "sum(" not in _code, "No shortcuts! Build the total yourself with a loop instead of sum()."
assert "5050" not in _code, "Don't hardcode 5050 — make the loop compute it."
`,
    hints: [
      "Pattern: <code>for n in range(1, 101):</code> then indented <code>total += n</code>.",
      "If you got 4950, your range stopped at 99 — use <code>range(1, 101)</code>.",
      "<code>total += n</code> is shorthand for <code>total = total + n</code>."
    ],
    solution: "total = 0\n\nfor n in range(1, 101):\n    total += n\n\nprint(total)"
  },
  {
    id: "m5l4",
    type: "lab",
    title: "Lab: FizzBuzz",
    minutes: 10,
    objective: "The most famous interview question in programming: print the numbers 1 to 30, but replace multiples of 3 with <code>Fizz</code>, multiples of 5 with <code>Buzz</code>, and multiples of both with <code>FizzBuzz</code>.",
    content: [
      { p: "One line of output per number. The start of the correct output looks like:" },
      { code: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n..." },
      { p: "Two tools from earlier modules crack it: <code>%</code> (a number <code>n</code> is a multiple of 3 when <code>n % 3 == 0</code>) and the if/elif chain. <strong>Order matters:</strong> check \"both\" first — otherwise plain Fizz or Buzz will win before FizzBuzz gets a chance." }
    ],
    starter: "for n in range(1, 31):\n    # your if / elif / else here\n    pass  # delete this line when you start\n",
    tests: `
_expected = []
for _n in range(1, 31):
    if _n % 15 == 0:
        _expected.append("FizzBuzz")
    elif _n % 3 == 0:
        _expected.append("Fizz")
    elif _n % 5 == 0:
        _expected.append("Buzz")
    else:
        _expected.append(str(_n))
_lines = [l.strip() for l in _stdout.split("\\n") if l.strip()]
assert len(_lines) == 30, f"Expected 30 lines of output (one per number), got {len(_lines)}."
for _i, (_got, _want) in enumerate(zip(_lines, _expected), start=1):
    assert _got == _want, f"Line {_i} should be '{_want}' but yours is '{_got}'."
`,
    hints: [
      "A multiple of both 3 and 5 is a multiple of 15: check <code>n % 15 == 0</code> FIRST.",
      "Chain: <code>if n % 15 == 0:</code> → <code>elif n % 3 == 0:</code> → <code>elif n % 5 == 0:</code> → <code>else: print(n)</code>.",
      "If your Fizz shows where FizzBuzz should be, your checks are in the wrong order."
    ],
    solution: "for n in range(1, 31):\n    if n % 15 == 0:\n        print(\"FizzBuzz\")\n    elif n % 3 == 0:\n        print(\"Fizz\")\n    elif n % 5 == 0:\n        print(\"Buzz\")\n    else:\n        print(n)"
  },
  {
    id: "m5l5",
    type: "lab",
    title: "Lab: Rocket countdown",
    minutes: 6,
    objective: "Use a <code>while</code> loop to count down from 5 to 1, then print <code>Liftoff!</code>",
    content: [
      { p: "Expected output, exactly:" },
      { code: "5\n4\n3\n2\n1\nLiftoff!" },
      { p: "Requirements: use a <code>while</code> loop (not <code>for</code>), and remember to change your counter inside the loop — or the rocket never launches and the page freezes. 🚀" }
    ],
    starter: "count = 5\n\n# while loop here\n\n# then the liftoff print\n",
    tests: `
_lines = [l.strip() for l in _stdout.split("\\n") if l.strip()]
assert _lines == ["5", "4", "3", "2", "1", "Liftoff!"], f"Expected the lines 5,4,3,2,1,Liftoff! — your output was: {_lines}"
assert "while" in _code, "Use a while loop for this one."
`,
    hints: [
      "Condition: <code>while count > 0:</code>",
      "Inside the loop: print the count, then <code>count -= 1</code>.",
      "<code>print(\"Liftoff!\")</code> goes <em>after</em> the loop — unindented."
    ],
    solution: "count = 5\n\nwhile count > 0:\n    print(count)\n    count -= 1\n\nprint(\"Liftoff!\")"
  }
  ]
},

// ================================================================
// MODULE 6 — LISTS
// ================================================================
{
  id: "m6",
  title: "Lists & Dictionaries",
  blurb: "Python's two workhorse data structures: ordered lists and labeled dictionaries.",
  lessons: [
  {
    id: "m6l1",
    type: "tutorial",
    title: "Creating & using lists",
    minutes: 8,
    content: [
      { p: "So far each variable held <em>one</em> value. A <code>list</code> holds many, in order, inside square brackets:" },
      { run: "colors = [\"red\", \"green\", \"blue\"]\nprint(colors)\nprint(len(colors))   # len() counts the items" },
      { h: "Grabbing items by position" },
      { p: "Each item has an <em>index</em> — its position, <strong>counting from 0</strong>:" },
      { run: "colors = [\"red\", \"green\", \"blue\"]\nprint(colors[0])    # first item\nprint(colors[1])    # second item\nprint(colors[-1])   # negative = count from the end: last item" },
      { warn: "Asking for an index that doesn't exist (<code>colors[3]</code> here) raises an <code>IndexError</code>. With 3 items, valid indexes are 0, 1, 2." },
      { h: "Lists can change" },
      { run: "todo = [\"eat\", \"sleep\"]\ntodo.append(\"learn Python\")   # add to the end\nprint(todo)\n\ntodo[0] = \"eat healthy\"       # replace an item\nprint(todo)" },
      { h: "Loop over a list" },
      { p: "The prettiest way to process a list — <code>for item in list</code> visits each item in order:" },
      { run: "scores = [82, 95, 71, 88]\n\nfor score in scores:\n    print(f\"Score: {score}\")" }
    ]
  },
  {
    id: "m6l2",
    type: "lab",
    title: "Lab: Shopping cart total",
    minutes: 7,
    objective: "Loop over the list of prices, accumulate the sum into <code>total</code>, and print it formatted to 2 decimals.",
    content: [
      { p: "This is the accumulator pattern from Module 5, applied to a real list. The expected total for the starter cart is <code>27.93</code>. No <code>sum()</code> — build it yourself!" }
    ],
    starter: "prices = [4.99, 12.50, 3.75, 6.69]\n\ntotal = 0\n\n# loop over prices, adding each to total\n\n# print the total with 2 decimal places\n",
    tests: `
import math
assert "total" in globals(), "Create a variable called total."
assert math.isclose(total, 27.93, abs_tol=1e-9), f"total should be 27.93 but yours is {round(total, 4)}."
assert "for" in _code, "Use a for loop over the prices list."
assert "sum(" not in _code, "Build the total with a loop instead of sum()."
assert "27.93" in _stdout, "Print the total formatted to 2 decimals (should show 27.93)."
`,
    hints: [
      "<code>for price in prices:</code> then <code>total += price</code>.",
      "Format the output: <code>print(f\"Total: ${total:.2f}\")</code>."
    ],
    solution: "prices = [4.99, 12.50, 3.75, 6.69]\n\ntotal = 0\nfor price in prices:\n    total += price\n\nprint(f\"Total: ${total:.2f}\")"
  },
  {
    id: "m6l3",
    type: "lab",
    title: "Lab: Find the champion",
    minutes: 8,
    objective: "Find the biggest number in the list <em>with a loop</em> — no <code>max()</code> allowed — and store it in <code>biggest</code>.",
    content: [
      { p: "The classic \"king of the hill\" algorithm:" },
      { list: [
        "Start by assuming the first item is the biggest: <code>biggest = scores[0]</code>",
        "Loop through the list; whenever an item is greater than <code>biggest</code>, it becomes the new <code>biggest</code>",
        "After the loop, print the winner"
      ]},
      { p: "This combines a loop <em>and</em> an if — your first real algorithm. 💪" }
    ],
    starter: "scores = [72, 95, 44, 88, 61, 93]\n\nbiggest = scores[0]\n\n# loop and compare\n\nprint(biggest)\n",
    tests: `
assert "biggest" in globals(), "Create a variable called biggest."
assert biggest == 95, f"biggest should be 95 but yours is {biggest}."
assert "max(" not in _code, "No max() — that's the point of the exercise! Use a loop and an if."
assert "for" in _code, "Use a for loop to visit each score."
assert "if" in _code, "Use an if to compare each score against biggest."
_code_no_list = "\\n".join(l for l in _code.split("\\n") if not l.strip().startswith("scores"))
assert "95" not in _code_no_list, "Don't hardcode 95 — let the loop find it."
`,
    hints: [
      "Inside the loop: <code>if score > biggest:</code>",
      "…and inside that if: <code>biggest = score</code>.",
      "Change some numbers in the list afterwards and re-run — it should always find the largest."
    ],
    solution: "scores = [72, 95, 44, 88, 61, 93]\n\nbiggest = scores[0]\nfor score in scores:\n    if score > biggest:\n        biggest = score\n\nprint(biggest)"
  },
  {
    id: "m6l4",
    type: "tutorial",
    title: "Using dictionaries: data with labels",
    minutes: 8,
    content: [
      { p: "A list finds things by <em>position</em> (0, 1, 2…). A <code>dict</code> — dictionary — finds things by <em>label</em>. Each entry is a <strong>key</strong> pointing to a <strong>value</strong>, wrapped in curly braces:" },
      { run: "player = {\"name\": \"Nova\", \"score\": 1200, \"power\": \"stealth\"}\n\nprint(player[\"name\"])    # look up by KEY, not position\nprint(player[\"score\"])\nprint(len(player))       # number of key:value pairs" },
      { list: [
        "Keys are usually strings (in quotes); values can be any type — strings, numbers, bools, even lists.",
        "Look up a value with square brackets and the key: <code>player[\"name\"]</code>.",
        "Think of it as a real dictionary: you look up a <em>word</em> (key) to get its <em>definition</em> (value)."
      ]},
      { warn: "Asking for a key that doesn't exist raises a <code>KeyError</code>. Try adding <code>print(player[\"speed\"])</code> above — then read the explanation under the error. Keys are case-sensitive: <code>\"Name\"</code> and <code>\"name\"</code> are different keys!" },
      { h: "Safe lookups: .get() and in" },
      { run: "player = {\"name\": \"Nova\", \"score\": 1200}\n\nprint(player.get(\"speed\"))        # missing key -> None (no crash)\nprint(player.get(\"speed\", 0))     # or give a default value\n\nif \"score\" in player:             # check before you look\n    print(\"Score is recorded!\")" }
    ]
  },
  {
    id: "m6l5",
    type: "tutorial",
    title: "Modifying dictionaries & looping",
    minutes: 8,
    content: [
      { p: "Dictionaries are fully changeable. The same bracket syntax that reads a value also <em>writes</em> one — it updates the key if it exists, or creates it if it doesn't:" },
      { run: "inventory = {\"apples\": 3, \"bread\": 1}\n\ninventory[\"apples\"] = 5      # update an existing key\ninventory[\"milk\"] = 2        # brand new key -> created!\ninventory[\"apples\"] += 1     # math shortcuts work too\n\nprint(inventory)" },
      { h: "Removing entries" },
      { run: "inventory = {\"apples\": 3, \"bread\": 1, \"expired_yogurt\": 4}\n\ndel inventory[\"expired_yogurt\"]\nprint(inventory)" },
      { h: "Looping over a dictionary" },
      { p: "A <code>for</code> loop visits each <strong>key</strong>; use the key to grab its value:" },
      { run: "scores = {\"Ada\": 95, \"Leo\": 82, \"Maya\": 88}\n\nfor name in scores:\n    print(f\"{name} scored {scores[name]}\")" },
      { tip: "You'll also see <code>for name, score in scores.items():</code> — a shortcut that hands you both at once. Try rewriting the loop above with it!" }
    ]
  },
  {
    id: "m6l6",
    type: "lab",
    title: "Lab: The player profile",
    minutes: 8,
    objective: "Read, update, and extend a dictionary: print the player's name, add 50 to their score, and add a brand-new <code>\"level\"</code> key.",
    content: [
      { p: "Using the <code>player</code> dictionary in the starter:" },
      { list: [
        "Print the player's name by looking it up <strong>with its key</strong>",
        "Add 50 to the score (update the existing value — don't retype the number!)",
        "Add a new key <code>\"level\"</code> with the value <code>2</code>",
        "Print the whole dictionary at the end"
      ]}
    ],
    starter: "player = {\"name\": \"Nova\", \"score\": 1200, \"power\": \"stealth\"}\n\n# 1) print the player's name (look it up by key)\n\n# 2) add 50 to the player's score\n\n# 3) add a new key \"level\" with the value 2\n\n# 4) print the whole dictionary\n",
    tests: `
assert "player" in globals() and isinstance(player, dict), "Keep the player dictionary from the starter."
assert player.get("name") == "Nova", "Don't change the player's name."
assert player.get("score") == 1250, f'player["score"] should be 1250 after adding 50 — yours is {player.get("score")}.'
assert "1250" not in _code, "Don't type 1250 directly — ADD 50 to the existing score (try +=)."
assert player.get("level") == 2, 'Add a new key "level" with the value 2 — creating a key looks just like updating one.'
assert "Nova" in _stdout, "Print the player's name (look it up with player[...])."
assert "level" in _stdout, "Print the whole dictionary at the end — you should see the new level key in the output."
`,
    hints: [
      "Look up the name: <code>print(player[\"name\"])</code>.",
      "Update in place: <code>player[\"score\"] += 50</code>.",
      "New keys are created by assigning: <code>player[\"level\"] = 2</code>."
    ],
    solution: "player = {\"name\": \"Nova\", \"score\": 1200, \"power\": \"stealth\"}\n\nprint(player[\"name\"])\n\nplayer[\"score\"] += 50\n\nplayer[\"level\"] = 2\n\nprint(player)"
  },
  {
    id: "m6l7",
    type: "lab",
    title: "Lab: The vote counter",
    minutes: 10,
    objective: "Loop over the list of votes and build a dictionary that counts how many times each option was chosen.",
    content: [
      { p: "This combines the whole module — a <strong>list</strong> feeding a <strong>dictionary</strong> through a loop. It's also one of the most common real-world patterns in programming (counting things!)." },
      { p: "For each vote in the list: if the option is already a key in <code>counts</code>, add 1 to it; otherwise create it with the value 1. Expected final result:" },
      { code: "{'pizza': 3, 'sushi': 2, 'tacos': 1}" }
    ],
    starter: "votes = [\"pizza\", \"sushi\", \"pizza\", \"tacos\", \"pizza\", \"sushi\"]\n\ncounts = {}\n\n# loop over votes, counting each option in the counts dictionary\n\nprint(counts)\n",
    tests: `
import re as _re
assert "counts" in globals() and isinstance(counts, dict), "Build your tallies in the counts dictionary."
assert counts == {"pizza": 3, "sushi": 2, "tacos": 1}, f"counts should be {{'pizza': 3, 'sushi': 2, 'tacos': 1}} but yours is {counts}."
assert "for" in _code, "Use a for loop over the votes list."
assert not _re.search(r"pizza[\\"\\']\\s*:\\s*3", _code), "Don't hardcode the totals — make the loop count them."
assert "Counter" not in _code and ".count(" not in _code, "Count manually with your loop — no Counter or .count() shortcuts here."
`,
    hints: [
      "Inside the loop: <code>if vote in counts:</code> … <code>else:</code> …",
      "Already seen? <code>counts[vote] += 1</code>. First time? <code>counts[vote] = 1</code>.",
      "Change the votes list afterwards and re-run — your counter should adapt automatically."
    ],
    solution: "votes = [\"pizza\", \"sushi\", \"pizza\", \"tacos\", \"pizza\", \"sushi\"]\n\ncounts = {}\n\nfor vote in votes:\n    if vote in counts:\n        counts[vote] += 1\n    else:\n        counts[vote] = 1\n\nprint(counts)"
  }
  ]
},

// ================================================================
// MODULE 7 — FUNCTIONS I: YOUR FIRST FUNCTIONS
// ================================================================
{
  id: "m7",
  title: "Functions I: Your First Functions",
  blurb: "The heart of this course — package code into named, reusable commands.",
  lessons: [
  {
    id: "m7l1",
    type: "tutorial",
    title: "Why functions? def, call, repeat",
    minutes: 10,
    content: [
      { p: "You've been <em>using</em> functions since your very first line — <code>print()</code>, <code>len()</code>, <code>round()</code>, <code>type()</code>. Now you learn to <strong>write your own</strong>. This is the single biggest step in becoming a programmer." },
      { h: "The problem functions solve" },
      { p: "Imagine printing a welcome banner in three places in your program. Copy-pasting the same 3 lines three times means: 3× the typing, and 3 places to fix every time the banner changes. Instead — write it once, <em>name</em> it, and reuse it:" },
      { run: "def welcome():\n    print(\"====================\")\n    print(\" WELCOME TO THE APP \")\n    print(\"====================\")\n\nwelcome()\nprint(\"...doing some work...\")\nwelcome()" },
      { h: "Anatomy of a function" },
      { code: "def welcome():        # def = \"define\". Then the name, parentheses, and a colon\n    print(\"...\")      # the BODY: indented 4 spaces, just like if/for blocks\n    print(\"...\")      # every indented line belongs to the function\n\nwelcome()             # a CALL: name + parentheses = \"run it now\"" },
      { list: [
        "<code>def</code> <strong>defines</strong> the function — Python memorizes the recipe but does <em>not</em> cook it yet.",
        "The function only runs when you <strong>call</strong> it: <code>welcome()</code>.",
        "No parentheses, no run: <code>welcome</code> alone just refers to the function without calling it."
      ]},
      { h: "Prove it to yourself" },
      { p: "Run this — notice the body's print never appears, because the function is defined but never called. Then add <code>greet()</code> at the bottom and run again:" },
      { run: "def greet():\n    print(\"Hello there!\")\n\nprint(\"Script finished.\")\n# add a call to greet() above this comment, then re-run" },
      { warn: "Define <em>before</em> you call. Python reads top to bottom — calling <code>greet()</code> on line 1 and defining it on line 5 gives a <code>NameError</code>." }
    ]
  },
  {
    id: "m7l2",
    type: "tutorial",
    title: "Functions, parameters & arguments",
    minutes: 10,
    content: [
      { p: "A function that always does the exact same thing is a one-trick pony. <em>Parameters</em> let you pass information in, so one function handles endless variations:" },
      { run: "def greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet(\"Ada\")\ngreet(\"Grace\")\ngreet(\"Alan\")" },
      { h: "Parameter vs argument — learn the vocabulary" },
      { p: "These two words get mixed up constantly, including in job interviews. The distinction:" },
      { list: [
        "A <strong>parameter</strong> is the variable named in the <code>def</code> line — the <em>placeholder</em>. Here: <code>name</code>.",
        "An <strong>argument</strong> is the actual value you send in a <em>call</em>. Here: <code>\"Ada\"</code>, <code>\"Grace\"</code>, <code>\"Alan\"</code>.",
        "Memory hook: the <em>parameter</em> is the <em>parking spot</em>; the <em>argument</em> is the car that parks in it. Each call, a new argument parks in the same spot."
      ]},
      { h: "Arguments can be more than literals" },
      { p: "Anything that produces a value can be an argument — a variable, an expression, even another function call:" },
      { run: "def greet(name):\n    print(f\"Hello, {name}!\")\n\nbest_friend = \"Sam\"\ngreet(best_friend)          # a variable as the argument\ngreet(\"a\" + \"my\")           # an expression as the argument\ngreet(best_friend.upper())  # a function call's RESULT as the argument" },
      { h: "Multiple parameters" },
      { p: "Separate them with commas. Arguments match parameters <strong>by position</strong> — first to first, second to second:" },
      { run: "def introduce(name, age, city):\n    print(f\"{name} is {age} years old and lives in {city}.\")\n\nintroduce(\"Maya\", 29, \"Denver\")\nintroduce(\"Leo\", 41, \"Miami\")" },
      { p: "Swap <code>\"Maya\"</code> and <code>29</code> in the first call and run again — the sentence turns to nonsense. Position matters! (Arguments passed this way are called <em>positional arguments</em>. In Module 9 you'll meet <em>keyword arguments</em>, which are matched by name instead.)" },
      { warn: "Calling with the wrong number of arguments is an instant <code>TypeError</code> — try <code>introduce(\"Maya\", 29)</code>. Python tells you exactly which parameter is missing. These are <em>good</em> errors: they catch bugs at the front door." },
      { tip: "Parameters make functions <em>testable</em> — this is why our labs prefer them over <code>input()</code>. Data goes in through the parentheses, and (next lesson) results come out through <code>return</code>." }
    ]
  },
  {
    id: "m7l3",
    type: "lab",
    title: "Lab: greet(name)",
    minutes: 7,
    objective: "Write a function <code>greet(name)</code> that prints <code>Hello, NAME!</code> — then call it at least twice with different names.",
    content: [
      { p: "Exact behavior required: <code>greet(\"Ada\")</code> must print exactly <code>Hello, Ada!</code> (capital H, comma + space, exclamation mark)." },
      { list: [
        "Define the function with <code>def greet(name):</code>",
        "One indented line in the body: an f-string print",
        "Below the function, call it at least twice with different names"
      ]}
    ],
    starter: "# define greet(name) here\n\n\n# call it at least twice with different names\n",
    tests: `
import io as _io, contextlib as _cl
assert "greet" in globals(), "Define a function called greet."
assert callable(greet), "greet should be a function — use def greet(name):"
_buf = _io.StringIO()
with _cl.redirect_stdout(_buf):
    greet("Ada")
_out = _buf.getvalue().strip()
assert _out == "Hello, Ada!", f'greet("Ada") should print exactly: Hello, Ada!  — yours printed: {_out!r}'
_buf = _io.StringIO()
with _cl.redirect_stdout(_buf):
    greet("Zoe")
_out = _buf.getvalue().strip()
assert _out == "Hello, Zoe!", f'greet("Zoe") should print exactly: Hello, Zoe!  — is your function using the name parameter, or is a name hardcoded?'
assert _code.count("greet(") >= 3, "After defining greet, call it at least twice (the def line plus 2+ calls)."
`,
    hints: [
      "Skeleton: <code>def greet(name):</code> newline, then indented <code>print(...)</code>.",
      "The body: <code>print(f\"Hello, {name}!\")</code> — use the parameter, don't hardcode a name.",
      "Calls (not indented!): <code>greet(\"Ada\")</code> and <code>greet(\"Zoe\")</code>."
    ],
    solution: "def greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet(\"Ada\")\ngreet(\"Zoe\")"
  },
  {
    id: "m7l4",
    type: "lab",
    title: "Lab: The badge printer",
    minutes: 9,
    objective: "Write <code>badge(name, role)</code> that prints a 3-line conference badge, then print badges for two different people.",
    content: [
      { p: "<code>badge(\"Sam\", \"Chef\")</code> must print exactly these 3 lines:" },
      { code: "----------\nSam\nRole: Chef\n----------" },
      { p: "Wait — that's 4 lines! Correct 😄 — a dashed line (10 dashes), the name, <code>Role: </code> + the role, and another dashed line. This lab shows the real power move: <strong>change once, fix everywhere</strong>. When your function passes, try making the dashed line longer — every badge updates instantly." }
    ],
    starter: "# define badge(name, role) here\n\n\n# print badges for two different people\n",
    tests: `
import io as _io, contextlib as _cl
assert "badge" in globals(), "Define a function called badge."
assert callable(badge), "badge should be a function — use def badge(name, role):"
_buf = _io.StringIO()
with _cl.redirect_stdout(_buf):
    badge("Sam", "Chef")
_lines = [l for l in _buf.getvalue().strip().split("\\n")]
assert len(_lines) == 4, f"badge() should print exactly 4 lines (dashes, name, role, dashes) — yours printed {len(_lines)}."
assert set(_lines[0]) == {"-"}, "Line 1 should be a row of dashes like ----------"
assert _lines[1] == "Sam", f"Line 2 should be just the name — yours is {_lines[1]!r}. Use the name parameter!"
assert _lines[2] == "Role: Chef", f"Line 3 should be 'Role: Chef' — yours is {_lines[2]!r}."
assert set(_lines[3]) == {"-"}, "Line 4 should be a row of dashes like ----------"
_buf = _io.StringIO()
with _cl.redirect_stdout(_buf):
    badge("Ana", "Pilot")
assert "Ana" in _buf.getvalue() and "Role: Pilot" in _buf.getvalue(), "The badge must adapt to whatever name and role are passed in — no hardcoding!"
assert _code.count("badge(") >= 3, "Call badge() at least twice below the definition."
`,
    hints: [
      "Four prints inside the function — two of them identical dash rows.",
      "Line 3 pattern: <code>print(f\"Role: {role}\")</code>.",
      "Don't forget two calls below the def, e.g. <code>badge(\"Sam\", \"Chef\")</code> and <code>badge(\"Ana\", \"Pilot\")</code>."
    ],
    solution: "def badge(name, role):\n    print(\"-\" * 10)\n    print(name)\n    print(f\"Role: {role}\")\n    print(\"-\" * 10)\n\nbadge(\"Sam\", \"Chef\")\nbadge(\"Ana\", \"Pilot\")"
  }
  ]
},

// ================================================================
// MODULE 8 — FUNCTIONS II: RETURN VALUES
// ================================================================
{
  id: "m8",
  title: "Functions II: return",
  blurb: "Make functions hand results back — the difference between printing and producing.",
  lessons: [
  {
    id: "m8l1",
    type: "tutorial",
    title: "return vs print — the big idea",
    minutes: 10,
    content: [
      { p: "This is the concept that separates people who <em>know about</em> functions from people who can <em>use</em> them. So far our functions printed things — useful for humans, useless for the rest of the program. <code>return</code> makes a function <strong>hand a value back</strong> to whoever called it:" },
      { run: "def add(a, b):\n    return a + b\n\nresult = add(2, 3)     # the returned 5 lands in the variable\nprint(result)\nprint(add(10, 20) * 2) # returned values plug into ANY expression" },
      { h: "print shows. return gives." },
      { list: [
        "<code>print()</code> paints characters on the screen. The program itself can't use them.",
        "<code>return</code> sends a value back into the program — to store, compare, do more math with, or pass to another function.",
        "A function call with a return value is like an expression: <code>add(2, 3)</code> <em>becomes</em> <code>5</code> wherever it's written."
      ]},
      { h: "See the difference" },
      { run: "def add_print(a, b):\n    print(a + b)       # shows 5, returns nothing\n\ndef add_return(a, b):\n    return a + b       # silent, hands back 5\n\nx = add_print(2, 3)\ny = add_return(2, 3)\nprint(f\"x is {x}\")     # x is None — print gave us nothing to keep!\nprint(f\"y is {y}\")" },
      { p: "<code>None</code> is Python's word for \"nothing here\". A function without a <code>return</code> statement returns <code>None</code> automatically. If you ever see <code>None</code> where you expected a number — you probably printed instead of returned. 🎯" },
      { h: "return exits immediately" },
      { run: "def check(n):\n    if n < 0:\n        return \"negative\"\n    return \"positive or zero\"   # only reached when the if didn't return\n\nprint(check(-5))\nprint(check(99))" },
      { warn: "Code after a <code>return</code> in the same path never runs — returning is leaving. This \"early return\" style is a clean way to handle special cases first." }
    ]
  },
  {
    id: "m8l2",
    type: "tutorial",
    title: "Composing: results flowing into results",
    minutes: 7,
    content: [
      { p: "Because returned values plug in anywhere, functions can <em>feed each other</em>. Small functions snap together like LEGO bricks:" },
      { run: "def double(n):\n    return n * 2\n\ndef add_ten(n):\n    return n + 10\n\nprint(add_ten(double(5)))    # double(5) -> 10, add_ten(10) -> 20\nprint(double(add_ten(5)))    # inner first: add_ten(5) -> 15, double -> 30" },
      { p: "Read nested calls from the <strong>inside out</strong> — the innermost function runs first, and its return value becomes the argument of the outer one." },
      { h: "Store, then pass" },
      { p: "Nesting deeply gets hard to read. It's often clearer to store intermediate results in named variables:" },
      { run: "def area(width, height):\n    return width * height\n\ndef price_of_carpet(square_meters):\n    return square_meters * 12.5\n\nroom = area(4, 5)\ncost = price_of_carpet(room)\nprint(f\"Carpeting a {room} m² room costs ${cost:.2f}\")" },
      { tip: "This is how real programs are built: many small functions, each doing one job well, passing results along. If a function is hard to name, it's probably doing too many jobs." }
    ]
  },
  {
    id: "m8l3",
    type: "lab",
    title: "Lab: add(a, b) — your first return",
    minutes: 6,
    objective: "Write <code>add(a, b)</code> that <strong>returns</strong> (not prints!) the sum of its two parameters.",
    content: [
      { p: "The checker will call your function with several different numbers and use the returned values — printing inside the function won't help it. One <code>def</code>, one <code>return</code> line. That's the whole lab. 🙂" }
    ],
    starter: "# define add(a, b) here\n\n\n# optional: try it out\n# print(add(2, 3))\n",
    tests: `
assert "add" in globals(), "Define a function called add."
assert callable(add), "add should be a function — def add(a, b):"
assert "return" in _code, "Use the return keyword — don't print inside the function."
_r = add(2, 3)
assert _r == 5, f"add(2, 3) should return 5, but returned {_r!r}." + (" (It returned None — are you printing instead of returning?)" if _r is None else "")
assert add(-1, 1) == 0, "add(-1, 1) should return 0."
assert add(0.5, 0.25) == 0.75, "add(0.5, 0.25) should return 0.75 — it must work for floats too."
assert add(100, 250) == 350, "add(100, 250) should return 350."
`,
    hints: [
      "Skeleton: <code>def add(a, b):</code> newline, indented <code>return a + b</code>.",
      "If the checker says it returned None, you printed instead of returned."
    ],
    solution: "def add(a, b):\n    return a + b\n\nprint(add(2, 3))"
  },
  {
    id: "m8l4",
    type: "lab",
    title: "Lab: Temperature converter",
    minutes: 7,
    objective: "Write <code>c_to_f(celsius)</code> that returns the Fahrenheit equivalent: multiply by 9/5, then add 32.",
    content: [
      { p: "Checkpoints: <code>c_to_f(0)</code> → <code>32</code>, <code>c_to_f(100)</code> → <code>212</code>, <code>c_to_f(37)</code> → <code>98.6</code>." },
      { p: "The formula in Python: <code>celsius * 9 / 5 + 32</code>. Return it — don't print it." }
    ],
    starter: "# define c_to_f(celsius) here\n\n\n# try it:\n# print(c_to_f(37))\n",
    tests: `
import math
assert "c_to_f" in globals(), "Define a function called c_to_f."
assert callable(c_to_f), "c_to_f should be a function."
assert "return" in _code, "Return the result instead of printing it."
_r = c_to_f(0)
assert _r is not None, "c_to_f(0) returned None — use return, not print."
assert math.isclose(_r, 32), f"c_to_f(0) should return 32, got {_r}."
assert math.isclose(c_to_f(100), 212), f"c_to_f(100) should return 212, got {c_to_f(100)}."
assert math.isclose(c_to_f(37), 98.6), f"c_to_f(37) should return 98.6, got {c_to_f(37)}."
assert math.isclose(c_to_f(-40), -40), "Fun fact check failed: c_to_f(-40) should return -40 (the scales cross there!)."
`,
    hints: [
      "One line body: <code>return celsius * 9 / 5 + 32</code>.",
      "Order of operations handles this fine, but parentheses are okay too: <code>(celsius * 9 / 5) + 32</code>."
    ],
    solution: "def c_to_f(celsius):\n    return celsius * 9 / 5 + 32\n\nprint(c_to_f(37))"
  },
  {
    id: "m8l5",
    type: "lab",
    title: "Lab: is_even(n) — returning True/False",
    minutes: 7,
    objective: "Write <code>is_even(n)</code> that returns <code>True</code> when <code>n</code> is even and <code>False</code> when it's odd.",
    content: [
      { p: "Functions that return a bool are called <em>predicates</em>, usually named <code>is_...</code> or <code>has_...</code> — and they plug straight into if statements: <code>if is_even(10):</code>." },
      { p: "Remember Module 3: a number is even when dividing by 2 leaves no remainder. And remember that comparisons <em>already produce</em> True/False…" },
      { tip: "The elegant one-liner: <code>return n % 2 == 0</code>. The comparison evaluates to True or False, and you return it directly. An if/else that returns True and False also works — but see how clean the direct way is." }
    ],
    starter: "# define is_even(n) here\n\n\n# try it:\n# print(is_even(10))\n# print(is_even(7))\n",
    tests: `
assert "is_even" in globals(), "Define a function called is_even."
assert callable(is_even), "is_even should be a function."
assert is_even(10) is True, f"is_even(10) should return True, got {is_even(10)!r}."
assert is_even(7) is False, f"is_even(7) should return False, got {is_even(7)!r}."
assert is_even(0) is True, "is_even(0) should return True (0 is even)."
assert is_even(-3) is False, "is_even(-3) should return False."
assert is_even(-8) is True, "is_even(-8) should return True."
`,
    hints: [
      "Even test: <code>n % 2 == 0</code>.",
      "That expression IS already True or False — return it: <code>return n % 2 == 0</code>."
    ],
    solution: "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(10))\nprint(is_even(7))"
  },
  {
    id: "m8l6",
    type: "lab",
    title: "Lab: max_of_three(a, b, c)",
    minutes: 9,
    objective: "Write <code>max_of_three(a, b, c)</code> that returns the largest of three numbers — using your own if logic, not the built-in <code>max()</code>.",
    content: [
      { p: "This combines everything in the module: parameters in, comparisons inside, a value out. There are several correct approaches:" },
      { list: [
        "Chain of ifs: check <code>a >= b and a >= c</code>, then <code>b >= a and b >= c</code>, else it's c.",
        "\"Champion\" style (like the list lab): start with <code>biggest = a</code>, challenge it with b, then with c, return the survivor.",
        "Early returns: <code>if</code> a wins, return a immediately — no else needed!"
      ]}
    ],
    starter: "# define max_of_three(a, b, c) here\n\n\n# try it:\n# print(max_of_three(3, 9, 5))\n",
    tests: `
assert "max_of_three" in globals(), "Define a function called max_of_three."
assert callable(max_of_three), "max_of_three should be a function."
assert "max(" not in _code.replace("max_of_three(", ""), "Use your own if logic — the built-in max() is off-limits here."
assert max_of_three(3, 9, 5) == 9, f"max_of_three(3, 9, 5) should return 9, got {max_of_three(3, 9, 5)!r}."
assert max_of_three(10, 2, 3) == 10, "max_of_three(10, 2, 3) should return 10 (first position must be able to win)."
assert max_of_three(1, 2, 30) == 30, "max_of_three(1, 2, 30) should return 30 (last position must be able to win)."
assert max_of_three(7, 7, 7) == 7, "max_of_three(7, 7, 7) should return 7 (ties are fine)."
assert max_of_three(-5, -2, -9) == -2, "max_of_three(-5, -2, -9) should return -2 (works with negatives)."
`,
    hints: [
      "Champion style: <code>biggest = a</code>, then <code>if b > biggest: biggest = b</code>, same for c, then <code>return biggest</code>.",
      "Use <code>>=</code> rather than <code>></code> in the chained-if approach, or ties will slip through to the wrong branch.",
      "Return inside an if ends the function immediately — later lines simply don't run."
    ],
    solution: "def max_of_three(a, b, c):\n    biggest = a\n    if b > biggest:\n        biggest = b\n    if c > biggest:\n        biggest = c\n    return biggest\n\nprint(max_of_three(3, 9, 5))"
  }
  ]
},

// ================================================================
// MODULE 9 — FUNCTIONS III: DEFAULTS, SCOPE & TEAMWORK
// ================================================================
{
  id: "m9",
  title: "Functions III: Defaults, Scope & Teamwork",
  blurb: "Default values, keyword arguments, variable scope, and functions calling functions.",
  lessons: [
  {
    id: "m9l1",
    type: "tutorial",
    title: "Default values & keyword arguments",
    minutes: 8,
    content: [
      { p: "Sometimes a parameter has an obvious usual value. Give it a <em>default</em> with <code>=</code> in the def line, and callers can skip it:" },
      { run: "def power_up(base, exponent=2):\n    return base ** exponent\n\nprint(power_up(5))       # exponent not given -> uses 2 -> 25\nprint(power_up(5, 3))    # exponent given -> 125" },
      { list: [
        "Parameters <em>with</em> defaults must come after the ones without: <code>def f(a, b=1):</code> ✅, <code>def f(a=1, b):</code> ❌.",
        "Defaults make functions friendly: easy calls for the common case, full control when needed."
      ]},
      { h: "Keyword arguments: name what you're passing" },
      { p: "You can pass arguments by <em>name</em> instead of position. This reads better and lets you skip over defaults:" },
      { run: "def make_coffee(size=\"medium\", milk=False, sugars=0):\n    print(f\"One {size} coffee, milk: {milk}, sugars: {sugars}\")\n\nmake_coffee()\nmake_coffee(size=\"large\", sugars=2)\nmake_coffee(milk=True)          # skipped size entirely!" },
      { tip: "You've already used keyword arguments — <code>round(3.14159, 2)</code>'s cousin <code>print(\"a\", \"b\", sep=\"-\")</code>. Try it! Mixing styles is fine: positional first, keywords after." }
    ]
  },
  {
    id: "m9l2",
    type: "tutorial",
    title: "Scope: what happens in a function, stays in a function",
    minutes: 8,
    content: [
      { p: "Variables created <em>inside</em> a function — including its parameters — are <strong>local</strong>: they exist only while the function runs, then vanish. This is a feature! Functions get a clean, private workspace." },
      { run: "def mix_potion():\n    secret = \"dragon scales\"\n    print(f\"Mixing with {secret}...\")\n\nmix_potion()\nprint(secret)   # NameError! 'secret' only exists inside the function" },
      { p: "Run it, enjoy the error, then delete the last line. 🙂" },
      { h: "Same name, different boxes" },
      { run: "count = 100          # global variable\n\ndef do_stuff():\n    count = 5        # a NEW local variable that just shares the name\n    print(f\"Inside: {count}\")\n\ndo_stuff()\nprint(f\"Outside: {count}\")   # the global one is untouched" },
      { p: "Assigning inside a function creates a <em>local</em> — it doesn't overwrite the outside variable. The clean way to get information out of a function isn't touching globals… it's <code>return</code>, which you already know. 🎉" },
      { h: "Docstrings: leave a note" },
      { p: "A string right under the <code>def</code> line documents what the function does. Tools (and <code>help()</code>) can read it:" },
      { run: "def c_to_f(celsius):\n    \"\"\"Convert a Celsius temperature to Fahrenheit.\"\"\"\n    return celsius * 9 / 5 + 32\n\nhelp(c_to_f)" }
    ]
  },
  {
    id: "m9l3",
    type: "lab",
    title: "Lab: power_up with a default",
    minutes: 7,
    objective: "Write <code>power_up(base, exponent=2)</code> that returns <code>base</code> raised to <code>exponent</code> — squaring by default.",
    content: [
      { p: "Required behavior:" },
      { list: [
        "<code>power_up(5)</code> → <code>25</code> (default exponent 2)",
        "<code>power_up(2, 3)</code> → <code>8</code>",
        "<code>power_up(base=3)</code> → <code>9</code> (works as a keyword call too — you get this for free!)"
      ]}
    ],
    starter: "# define power_up(base, exponent=2) here\n\n\n# try it:\n# print(power_up(5))\n# print(power_up(2, 3))\n",
    tests: `
assert "power_up" in globals(), "Define a function called power_up."
assert callable(power_up), "power_up should be a function."
assert "exponent=2" in _code.replace(" ", ""), "Give exponent a default value of 2 in the def line: def power_up(base, exponent=2):"
assert power_up(5) == 25, f"power_up(5) should return 25 using the default exponent, got {power_up(5)!r}."
assert power_up(2, 3) == 8, f"power_up(2, 3) should return 8, got {power_up(2, 3)!r}."
assert power_up(base=3) == 9, "power_up(base=3) should return 9 when called with a keyword argument."
assert power_up(10, exponent=1) == 10, "power_up(10, exponent=1) should return 10."
`,
    hints: [
      "The default goes in the def line: <code>def power_up(base, exponent=2):</code>",
      "Power operator from Module 3: <code>**</code>. Body: <code>return base ** exponent</code>."
    ],
    solution: "def power_up(base, exponent=2):\n    return base ** exponent\n\nprint(power_up(5))\nprint(power_up(2, 3))"
  },
  {
    id: "m9l4",
    type: "lab",
    title: "Lab: The checkout function",
    minutes: 9,
    objective: "Write <code>checkout(price, tax_rate=0.07, discount=0.0)</code> that returns the final price, rounded to 2 decimals.",
    content: [
      { p: "The math, in order:" },
      { list: [
        "Subtract the discount first: <code>price * (1 - discount)</code> (a discount of <code>0.2</code> means 20% off)",
        "Then add tax: multiply by <code>(1 + tax_rate)</code>",
        "Return the result rounded to 2 decimal places with <code>round(..., 2)</code>"
      ]},
      { p: "Checkpoints: <code>checkout(100)</code> → <code>107.0</code> · <code>checkout(100, 0.1)</code> → <code>110.0</code> · <code>checkout(100, 0.07, 0.5)</code> → <code>53.5</code> · <code>checkout(80, discount=0.25)</code> → <code>64.2</code>" }
    ],
    starter: "# define checkout(price, tax_rate=0.07, discount=0.0) here\n\n\n# try it:\n# print(checkout(100))\n",
    tests: `
import math
assert "checkout" in globals(), "Define a function called checkout."
assert callable(checkout), "checkout should be a function."
assert math.isclose(checkout(100), 107.0), f"checkout(100) should return 107.0 (7% default tax), got {checkout(100)!r}."
assert math.isclose(checkout(100, 0.1), 110.0), f"checkout(100, 0.1) should return 110.0, got {checkout(100, 0.1)!r}."
assert math.isclose(checkout(100, 0.07, 0.5), 53.5, abs_tol=0.01), f"checkout(100, 0.07, 0.5) should return 53.5 (50% off THEN tax), got {checkout(100, 0.07, 0.5)!r}."
assert math.isclose(checkout(80, discount=0.25), 64.2, abs_tol=0.01), f"checkout(80, discount=0.25) should return 64.2, got {checkout(80, discount=0.25)!r}."
assert "round" in _code, "Round the result to 2 decimals with round(result, 2)."
`,
    hints: [
      "Def line: <code>def checkout(price, tax_rate=0.07, discount=0.0):</code>",
      "Body idea: <code>discounted = price * (1 - discount)</code>, then <code>total = discounted * (1 + tax_rate)</code>, then <code>return round(total, 2)</code>.",
      "Getting 110.7 for the discount case? You added tax before the discount — apply the discount first."
    ],
    solution: "def checkout(price, tax_rate=0.07, discount=0.0):\n    discounted = price * (1 - discount)\n    total = discounted * (1 + tax_rate)\n    return round(total, 2)\n\nprint(checkout(100))\nprint(checkout(100, 0.07, 0.5))"
  },
  {
    id: "m9l5",
    type: "lab",
    title: "Lab: Functions calling functions",
    minutes: 10,
    objective: "Build a tiny pipeline: <code>clean_name(name)</code> tidies up messy text, and <code>make_email(first, last)</code> uses it to build an email address.",
    content: [
      { p: "Two functions, where the second <strong>calls the first</strong>:" },
      { list: [
        "<code>clean_name(name)</code> — returns the name with surrounding spaces removed and the first letter capitalized. Python gives you both for free: <code>name.strip()</code> removes outer spaces, and <code>.title()</code> capitalizes. Chain them: <code>name.strip().title()</code>.",
        "<code>make_email(first, last)</code> — cleans both names <em>by calling clean_name</em>, then returns <code>first.last@pythonlab.dev</code> in all lowercase (<code>.lower()</code>)."
      ]},
      { p: "Checkpoint: <code>make_email(\"  aDa \", \"LOVELACE\")</code> → <code>\"ada.lovelace@pythonlab.dev\"</code>" }
    ],
    starter: "# define clean_name(name) here\n\n\n# define make_email(first, last) here — it must call clean_name\n\n\n# try it:\n# print(make_email(\"  aDa \", \"LOVELACE\"))\n",
    tests: `
assert "clean_name" in globals() and callable(clean_name), "Define a function called clean_name."
assert "make_email" in globals() and callable(make_email), "Define a function called make_email."
assert clean_name("  aDa ") == "Ada", f'clean_name("  aDa ") should return "Ada", got {clean_name("  aDa ")!r}. Chain .strip().title()'
assert clean_name("LOVELACE") == "Lovelace", f'clean_name("LOVELACE") should return "Lovelace", got {clean_name("LOVELACE")!r}.'
_r = make_email("  aDa ", "LOVELACE")
assert _r == "ada.lovelace@pythonlab.dev", f'make_email("  aDa ", "LOVELACE") should return "ada.lovelace@pythonlab.dev", got {_r!r}.'
_r2 = make_email("Grace", "Hopper")
assert _r2 == "grace.hopper@pythonlab.dev", f'make_email("Grace", "Hopper") should return "grace.hopper@pythonlab.dev", got {_r2!r}.'
import re as _re
_body = _re.search(r"def\\s+make_email[\\s\\S]*", _code).group(0)
assert "clean_name(" in _body, "make_email should call clean_name to do the tidying — don't repeat the strip/title logic."
`,
    hints: [
      "clean_name body: <code>return name.strip().title()</code>.",
      "Inside make_email: <code>first = clean_name(first)</code> and same for last.",
      "Build the address with an f-string, then lowercase the whole thing: <code>f\"{first}.{last}@pythonlab.dev\".lower()</code>."
    ],
    solution: "def clean_name(name):\n    return name.strip().title()\n\ndef make_email(first, last):\n    first = clean_name(first)\n    last = clean_name(last)\n    return f\"{first}.{last}@pythonlab.dev\".lower()\n\nprint(make_email(\"  aDa \", \"LOVELACE\"))"
  }
  ]
},

// ================================================================
// MODULE — WORKING WITH STRINGS
// ================================================================
{
  id: "m11",
  title: "Working with Strings",
  blurb: "Compare, slice, search, split and join text — the data type you'll touch most.",
  lessons: [
  {
    id: "m11l1",
    type: "tutorial",
    title: "Comparing & transforming text",
    minutes: 8,
    content: [
      { p: "More real-world data is text than anything else — names, emails, messages, files. Python strings come with a toolbox of built-in <em>methods</em> you call with a dot. First, comparison:" },
      { run: "print(\"hello\" == \"hello\")   # exact match -> True\nprint(\"Hello\" == \"hello\")   # case matters! -> False\nprint(\"hello\" != \"goodbye\") # not equal -> True" },
      { h: "Changing case & trimming" },
      { run: "shout = \"PYTHON IS FUN\"\nprint(shout.lower())            # all lowercase\nprint(\"quiet\".upper())          # ALL UPPERCASE\nprint(\"ada lovelace\".title())   # First Letters Capitalized\nprint(\"   spaced out   \".strip() + \"!\")  # trims outer spaces" },
      { warn: "Strings are <em>immutable</em> — methods don't change the original, they <strong>return a new string</strong>. <code>name.upper()</code> alone does nothing you can see; you must use the result: <code>loud = name.upper()</code> or print it directly." },
      { h: "The classic pattern: case-insensitive comparison" },
      { p: "Is <code>\"YES\"</code> the same answer as <code>\"yes\"</code>? To a human, sure — to <code>==</code>, no. The fix: lowercase <em>both sides</em> before comparing:" },
      { run: "answer = \"  YES \"\n\nif answer.strip().lower() == \"yes\":\n    print(\"They agreed!\")" },
      { tip: "Chaining methods like <code>answer.strip().lower()</code> runs left to right: strip first, then lowercase the result. You used this in the functions module — now you know the whole family." }
    ]
  },
  {
    id: "m11l2",
    type: "lab",
    title: "Lab: Username gatekeeper",
    minutes: 8,
    objective: "Write <code>normalize(username)</code> (trim + lowercase) and <code>same_user(a, b)</code>, which returns <code>True</code> when two messy usernames are really the same person.",
    content: [
      { list: [
        "<code>normalize(username)</code> — returns the username with outer spaces removed and all letters lowercase. <code>normalize(\"  MegaCoder99 \")</code> → <code>\"megacoder99\"</code>",
        "<code>same_user(a, b)</code> — normalizes <em>both</em> arguments (by calling your first function!) and returns whether they're equal. <code>same_user(\" ADA \", \"ada\")</code> → <code>True</code>"
      ]}
    ],
    starter: "# define normalize(username) here\n\n\n# define same_user(a, b) here — it should call normalize\n\n\n# try them:\n# print(normalize(\"  MegaCoder99 \"))\n# print(same_user(\" ADA \", \"ada\"))\n",
    tests: `
import re as _re
assert "normalize" in globals() and callable(normalize), "Define a function called normalize."
assert "same_user" in globals() and callable(same_user), "Define a function called same_user."
assert normalize("  MegaCoder99 ") == "megacoder99", f'normalize("  MegaCoder99 ") should return "megacoder99", got {normalize("  MegaCoder99 ")!r}. Chain .strip().lower()'
assert normalize("ADA") == "ada", f'normalize("ADA") should return "ada", got {normalize("ADA")!r}.'
assert same_user(" ADA ", "ada") is True, 'same_user(" ADA ", "ada") should return True.'
assert same_user("MegaCoder99", "  megacoder99 ") is True, 'same_user("MegaCoder99", "  megacoder99 ") should return True.'
assert same_user("ada", "grace") is False, 'same_user("ada", "grace") should return False.'
_body = _re.search(r"def\\s+same_user[\\s\\S]*", _code).group(0)
assert "normalize(" in _body, "same_user should CALL normalize on both arguments — don't repeat the strip/lower logic."
`,
    hints: [
      "normalize body: <code>return username.strip().lower()</code>.",
      "same_user body: <code>return normalize(a) == normalize(b)</code> — the comparison already produces True/False."
    ],
    solution: "def normalize(username):\n    return username.strip().lower()\n\n\ndef same_user(a, b):\n    return normalize(a) == normalize(b)\n\n\nprint(same_user(\" ADA \", \"ada\"))"
  },
  {
    id: "m11l3",
    type: "tutorial",
    title: "Slicing strings",
    minutes: 8,
    content: [
      { p: "You already know single-character indexing from the lists module — it works on strings too: <code>word[0]</code> is the first letter, <code>word[-1]</code> the last. <em>Slicing</em> grabs a whole range at once:" },
      { run: "word = \"programming\"\n\nprint(word[0:3])    # positions 0,1,2 -> \"pro\" (the stop is NOT included)\nprint(word[3:7])    # \"gram\"" },
      { h: "Shortcuts: leave an end open" },
      { run: "phone = \"614-555-0199\"\n\nprint(phone[:3])     # from the start -> \"614\"\nprint(phone[4:])     # to the end -> \"555-0199\"\nprint(phone[-4:])    # last 4 characters -> \"0199\"" },
      { list: [
        "<code>s[start:stop]</code> — characters from <code>start</code> up to <strong>but not including</strong> <code>stop</code>",
        "<code>s[:n]</code> — the first n characters &nbsp;·&nbsp; <code>s[n:]</code> — everything from position n",
        "<code>s[-n:]</code> — the last n characters (negative counts from the end)"
      ]},
      { h: "Party tricks with a step" },
      { run: "secret = \"pxyxtxhxoxn\"\nprint(secret[::2])    # every 2nd character\nprint(\"stressed\"[::-1])  # step -1 walks backwards: reverse!" },
      { tip: "Unlike single indexing, slicing never crashes: <code>\"hi\"[0:99]</code> just gives <code>\"hi\"</code>. Slices also work identically on lists: <code>scores[:3]</code> is the first three scores." }
    ]
  },
  {
    id: "m11l4",
    type: "lab",
    title: "Lab: Slice the phone number",
    minutes: 7,
    objective: "Write <code>area_code(phone)</code> and <code>line_number(phone)</code> using slices — no loops needed.",
    content: [
      { p: "Phone numbers arrive as strings like <code>\"614-555-0199\"</code>:" },
      { list: [
        "<code>area_code(phone)</code> — returns the first 3 characters: <code>\"614\"</code>",
        "<code>line_number(phone)</code> — returns the last 4 characters: <code>\"0199\"</code> (use a negative slice so it works for any length!)"
      ]}
    ],
    starter: "# define area_code(phone) here\n\n\n# define line_number(phone) here\n\n\n# try them:\n# print(area_code(\"614-555-0199\"))\n# print(line_number(\"614-555-0199\"))\n",
    tests: `
assert "area_code" in globals() and callable(area_code), "Define a function called area_code."
assert "line_number" in globals() and callable(line_number), "Define a function called line_number."
assert area_code("614-555-0199") == "614", f'area_code("614-555-0199") should return "614", got {area_code("614-555-0199")!r}.'
assert area_code("212-867-5309") == "212", f'area_code("212-867-5309") should return "212", got {area_code("212-867-5309")!r}.'
assert line_number("614-555-0199") == "0199", f'line_number("614-555-0199") should return "0199", got {line_number("614-555-0199")!r}.'
assert line_number("+1-212-867-5309") == "5309", 'line_number should grab the LAST 4 characters even for longer strings — use a negative slice like [-4:].'
assert "[" in _code and ":" in _code, "Use slice syntax with square brackets and a colon, like phone[:3]."
`,
    hints: [
      "First three characters: <code>phone[:3]</code>.",
      "Last four characters, any length: <code>phone[-4:]</code>."
    ],
    solution: "def area_code(phone):\n    return phone[:3]\n\n\ndef line_number(phone):\n    return phone[-4:]\n\n\nprint(area_code(\"614-555-0199\"))\nprint(line_number(\"614-555-0199\"))"
  },
  {
    id: "m11l5",
    type: "tutorial",
    title: "Searching & replacing",
    minutes: 8,
    content: [
      { p: "Four everyday questions about text, and their Python answers:" },
      { run: "message = \"the quick brown fox jumps over the lazy dog\"\n\nprint(\"fox\" in message)          # is it in there? -> True/False\nprint(message.count(\"the\"))      # how many times?\nprint(message.find(\"brown\"))     # WHERE? -> position 10 (or -1 if absent)\nprint(message.find(\"cat\"))       # not found -> -1 (no crash!)" },
      { h: "Starts and ends" },
      { run: "filename = \"report_2026.pdf\"\n\nprint(filename.endswith(\".pdf\"))     # great for checking file types\nprint(filename.startswith(\"report\")) # ...or prefixes" },
      { h: "Replacing" },
      { p: "<code>.replace(old, new)</code> swaps <em>every</em> occurrence — and like all string methods, returns a <strong>new</strong> string:" },
      { run: "draft = \"I luv Python. Python is luvly.\"\n\nfinal = draft.replace(\"luv\", \"love\")\nprint(final)\nprint(draft)   # the original is untouched!" },
      { tip: "<code>in</code> gives you a bool, so it plugs straight into ifs: <code>if \"@\" in email:</code> is the world's simplest email sanity check." }
    ]
  },
  {
    id: "m11l6",
    type: "tutorial",
    title: "Split & join",
    minutes: 8,
    content: [
      { p: "The bridge between strings and lists. <code>.split()</code> chops a string into a list; <code>.join()</code> glues a list back into a string." },
      { run: "sentence = \"learn python by writing python\"\nwords = sentence.split()      # splits on spaces\nprint(words)\nprint(len(words))" },
      { h: "Splitting on other separators" },
      { run: "csv_row = \"Ada,Lovelace,1815,London\"\nfields = csv_row.split(\",\")\nprint(fields)\nprint(fields[0])   # it's a normal list — index it, loop it, anything" },
      { h: "Joining" },
      { p: "<code>.join()</code> reads backwards at first: you call it on the <em>separator</em>, and pass the list:" },
      { run: "tags = [\"python\", \"beginner\", \"labs\"]\n\nprint(\" | \".join(tags))\nprint(\"-\".join(tags))\nprint(\", \".join(tags))" },
      { tip: "Split and join are how the capstone word-counter works, and they're the heart of endless real tasks: parsing CSV files, cleaning up names, building URLs. Master this pair and text data stops being scary." }
    ]
  },
  {
    id: "m11l7",
    type: "lab",
    title: "Lab: The text toolkit",
    minutes: 12,
    objective: "Build three tiny text utilities: <code>censor</code>, <code>make_slug</code>, and <code>first_word</code>.",
    content: [
      { p: "Each is 1–2 lines with the right method:" },
      { list: [
        "<code>censor(text, word)</code> — returns the text with every occurrence of <code>word</code> replaced by <code>\"***\"</code>. <code>censor(\"the secret plan is secret\", \"secret\")</code> → <code>\"the *** plan is ***\"</code>",
        "<code>make_slug(title)</code> — turns a blog title into a URL slug: trim outer spaces, lowercase everything, replace the remaining spaces with hyphens. <code>make_slug(\"  My First Blog Post \")</code> → <code>\"my-first-blog-post\"</code>",
        "<code>first_word(text)</code> — returns just the first word. <code>first_word(\"hello brave world\")</code> → <code>\"hello\"</code> (split it, then index!)"
      ]}
    ],
    starter: "# define censor(text, word) here\n\n\n# define make_slug(title) here\n\n\n# define first_word(text) here\n\n\n# try them:\n# print(censor(\"the secret plan is secret\", \"secret\"))\n# print(make_slug(\"  My First Blog Post \"))\n# print(first_word(\"hello brave world\"))\n",
    tests: `
for _fn in ("censor", "make_slug", "first_word"):
    assert _fn in globals() and callable(globals()[_fn]), f"Define a function called {_fn}."
assert censor("the secret plan is secret", "secret") == "the *** plan is ***", f'censor(...) should replace EVERY occurrence: expected "the *** plan is ***", got {censor("the secret plan is secret", "secret")!r}.'
assert censor("all good here", "bad") == "all good here", "censor should leave text unchanged when the word is absent."
assert make_slug("  My First Blog Post ") == "my-first-blog-post", f'make_slug("  My First Blog Post ") should return "my-first-blog-post", got {make_slug("  My First Blog Post ")!r}. Order matters: strip FIRST, then lowercase, then replace spaces.'
assert make_slug("Python Rocks") == "python-rocks", f'make_slug("Python Rocks") should return "python-rocks", got {make_slug("Python Rocks")!r}.'
assert first_word("hello brave world") == "hello", f'first_word("hello brave world") should return "hello", got {first_word("hello brave world")!r}.'
assert first_word("solo") == "solo", 'first_word("solo") should return "solo".'
assert ".replace(" in _code, "Use .replace() for censor and make_slug."
assert ".split(" in _code, "Use .split() for first_word."
`,
    hints: [
      "censor: <code>return text.replace(word, \"***\")</code>.",
      "make_slug: chain it — <code>title.strip().lower().replace(\" \", \"-\")</code>.",
      "first_word: <code>text.split()</code> gives a list; return item <code>[0]</code>."
    ],
    solution: "def censor(text, word):\n    return text.replace(word, \"***\")\n\n\ndef make_slug(title):\n    return title.strip().lower().replace(\" \", \"-\")\n\n\ndef first_word(text):\n    return text.split()[0]\n\n\nprint(censor(\"the secret plan is secret\", \"secret\"))\nprint(make_slug(\"  My First Blog Post \"))\nprint(first_word(\"hello brave world\"))"
  }
  ]
},

// ================================================================
// MODULE — DEBUGGING PYTHON
// ================================================================
{
  id: "m12",
  title: "Debugging Python",
  blurb: "Read tracebacks like a pro, learn a repeatable troubleshooting process, and fix six classic bug types.",
  lessons: [
  {
    id: "m12l1",
    type: "tutorial",
    title: "Reading tracebacks: errors are maps",
    minutes: 10,
    content: [
      { p: "Every programmer's code breaks — daily. What separates beginners from professionals is what happens next: pros <em>read the error</em>. A Python error message (a <strong>traceback</strong>) is not an insult; it's a map to the bug." },
      { h: "How to read a traceback" },
      { list: [
        "<strong>Read the bottom line first</strong> — it names the error type and describes the problem, e.g. <code>NameError: name 'totl' is not defined</code>.",
        "<strong>Then find the line number</strong> — the lines above show exactly where Python was when it gave up.",
        "On this site, a 💡 box under every error explains what that error type means in plain English — use it!"
      ]},
      { p: "Try it — run this, then read the traceback bottom-up before fixing the typo:" },
      { run: "total = 10 + 5\nprint(totl)   # oops — read the error, then fix the name" },
      { h: "The error hall of fame" },
      { p: "You'll meet these eight constantly. Knowing what each one <em>usually</em> means cuts your debugging time in half:" },
      { list: [
        "<code>SyntaxError</code> — Python can't read the line: missing colon, quote, comma, or parenthesis.",
        "<code>IndentationError</code> — the spacing at the start of a line doesn't match its block.",
        "<code>NameError</code> — a variable or function name is misspelled or not created yet.",
        "<code>TypeError</code> — wrong type: adding text to numbers, or calling a function with the wrong number of arguments.",
        "<code>ValueError</code> — right type, unusable value: <code>int(\"hello\")</code>.",
        "<code>IndexError</code> — a list/string position that doesn't exist (remember: last item is <code>len(x) - 1</code>).",
        "<code>KeyError</code> — a dictionary key that doesn't exist (check spelling and capitalization).",
        "<code>ZeroDivisionError</code> — dividing by zero, often via a variable that unexpectedly became 0."
      ]},
      { h: "The troubleshooting process" },
      { p: "When something breaks — or runs but gives the wrong answer — work this loop:" },
      { list: [
        "<strong>1. Reproduce</strong> — run it again; make the failure reliable.",
        "<strong>2. Read</strong> — bottom line of the traceback, then the line number. No error? Compare expected vs actual output precisely.",
        "<strong>3. Isolate</strong> — narrow down which line or value is wrong (the next lesson gives you tools for this).",
        "<strong>4. Fix ONE thing</strong> — smallest change that addresses the evidence.",
        "<strong>5. Re-run</strong> — confirm the fix, and that nothing else broke. Repeat."
      ]},
      { tip: "Fix one bug at a time. Python only reports the <em>first</em> problem it hits — fixing it often reveals the next one. That's progress, not failure!" }
    ]
  },
  {
    id: "m12l2",
    type: "tutorial",
    title: "Debugging techniques",
    minutes: 9,
    content: [
      { p: "The hardest bugs raise no error at all — the code runs and simply gives the wrong answer (a <em>logic error</em>). You can't read a traceback that doesn't exist, so you need investigation techniques." },
      { h: "Technique 1: print debugging" },
      { p: "The oldest trick in the book: print your variables mid-program to <em>see</em> what's actually happening instead of guessing. This program should average the scores but doesn't — the spy print inside the loop exposes the bug:" },
      { run: "scores = [80, 90, 100]\n\nfor score in scores:\n    total = 0\n    total += score\n    print(f\"DEBUG: score={score}, total={total}\")   # spy print\n\nprint(f\"Average: {total / len(scores)}\")" },
      { p: "Read the DEBUG lines: the total keeps <em>resetting</em>! The <code>total = 0</code> line is inside the loop, so every lap starts over. Move it above the loop, re-run, and watch the debug lines tell a healthy story. (Then delete the spy print — they're scaffolding, not furniture.)" },
      { h: "Technique 2: comment code out" },
      { p: "Not sure which section is guilty? Put <code>#</code> in front of suspect lines to disable them and re-run. When the problem disappears, you've found the neighborhood of the bug." },
      { h: "Technique 3: test tiny pieces" },
      { p: "Suspicious of one expression? Run it alone with a known answer. If <code>round(2.675, 2)</code> doesn't do what you expect, you found a fact — no guessing required. This is why functions are so debuggable: you can call them directly with easy inputs." },
      { h: "Technique 4: explain it out loud" },
      { p: "Describe your code line by line — to a colleague, or famously to a rubber duck. 🦆 Saying \"…and this loop runs while count is greater than… oh. OH.\" is a rite of passage. The bug hides in the gap between what you <em>meant</em> and what you <em>wrote</em>; explaining exposes the gap." },
      { tip: "The six labs ahead are a debugging gym: each starter is broken with a classic bug type. Use the process — reproduce, read, isolate, fix one thing, re-run." }
    ]
  },
  {
    id: "m12l3",
    type: "lab",
    title: "Fix it: calculation errors",
    minutes: 8,
    objective: "The <code>average_of</code> function returns nonsense because of an <strong>order-of-operations</strong> bug. Find it and fix it.",
    content: [
      { p: "<code>average_of(10, 20)</code> should return <code>15</code> — but run it and see what you get. No error is raised: the math itself is legal, just <em>wrong</em>. Check how Python's operator precedence (Module 3!) is reading that return line differently than the author intended." }
    ],
    starter: "def average_of(a, b):\n    return a + b / 2\n\n\nprint(average_of(10, 20))   # should print 15.0\nprint(average_of(8, 4))     # should print 6.0\n",
    tests: `
import math
assert "average_of" in globals() and callable(average_of), "Keep the average_of function."
assert math.isclose(average_of(10, 20), 15.0), f"average_of(10, 20) should return 15.0, got {average_of(10, 20)!r}. Division happens BEFORE addition — force the addition first."
assert math.isclose(average_of(8, 4), 6.0), f"average_of(8, 4) should return 6.0, got {average_of(8, 4)!r}."
assert math.isclose(average_of(0, 10), 5.0), f"average_of(0, 10) should return 5.0, got {average_of(0, 10)!r}."
assert "(" in _code.split("return")[1].split("\\n")[0], "The fix uses parentheses in the return line."
`,
    hints: [
      "Python reads <code>a + b / 2</code> as <code>a + (b / 2)</code> — division binds tighter than addition.",
      "Parentheses override precedence: <code>(a + b) / 2</code>."
    ],
    solution: "def average_of(a, b):\n    return (a + b) / 2\n\n\nprint(average_of(10, 20))\nprint(average_of(8, 4))"
  },
  {
    id: "m12l4",
    type: "lab",
    title: "Fix it: logic errors",
    minutes: 10,
    objective: "The ticket-pricing function runs without errors but charges the wrong people. Fix its <strong>two logic bugs</strong>.",
    content: [
      { p: "The pricing rule the cinema <em>wants</em>: a discounted $8 ticket for anyone <strong>under 18</strong>, <strong>OR</strong> a student, <strong>OR</strong> <strong>65 and older</strong>. Everyone else pays $12." },
      { p: "The code below gets several cases wrong. Test it against the rule: a 16-year-old non-student should pay 8 (do they?). A 65-year-old should pay 8 (do they?). Compare each condition to the rule, word by word." }
    ],
    starter: "def ticket_price(age, is_student):\n    if age < 18 and is_student:\n        return 8\n    elif age > 65:\n        return 8\n    else:\n        return 12\n\n\nprint(ticket_price(16, False))   # should be 8 (under 18)\nprint(ticket_price(65, False))   # should be 8 (65 and older)\nprint(ticket_price(30, True))    # should be 8 (student)\nprint(ticket_price(30, False))   # should be 12\n",
    tests: `
assert "ticket_price" in globals() and callable(ticket_price), "Keep the ticket_price function."
_cases = [
    (16, False, 8, "a 16-year-old non-student is under 18, so they get the discount — check your and/or"),
    (65, False, 8, "65 counts as '65 and older' — check > vs >="),
    (30, True, 8, "a 30-year-old student gets the discount"),
    (30, False, 12, "a 30-year-old non-student pays full price"),
    (70, False, 8, "seniors get the discount"),
    (17, True, 8, "young students get the discount"),
]
for _age, _stu, _want, _why in _cases:
    _got = ticket_price(_age, _stu)
    assert _got == _want, f"ticket_price({_age}, {_stu}) should return {_want} but returned {_got} — {_why}."
`,
    hints: [
      "\"Under 18 OR a student\" — but the code says <code>and</code>, which wrongly requires BOTH.",
      "\"65 and older\" includes 65 itself — <code>age > 65</code> excludes it. Which operator includes it?",
      "You can even merge everything into one condition with two <code>or</code>s."
    ],
    solution: "def ticket_price(age, is_student):\n    if age < 18 or is_student:\n        return 8\n    elif age >= 65:\n        return 8\n    else:\n        return 12\n\n\nprint(ticket_price(16, False))\nprint(ticket_price(65, False))\nprint(ticket_price(30, True))\nprint(ticket_price(30, False))"
  },
  {
    id: "m12l5",
    type: "lab",
    title: "Fix it: off-by-one errors",
    minutes: 10,
    objective: "Two functions, each wrong by exactly one — the most common bug in all of programming.",
    content: [
      { p: "Off-by-one errors come from forgetting two facts you already know:" },
      { list: [
        "<code>range(a, b)</code> stops <strong>before</strong> b — so <code>sum_first(5)</code> below quietly sums 1 to 4.",
        "List positions start at 0 — so the last item lives at <code>len(items) - 1</code>, and asking for <code>items[len(items)]</code> is one step past the edge (run it: <code>IndexError</code>, and read the 💡 explanation)."
      ]}
    ],
    starter: "def sum_first(n):\n    total = 0\n    for i in range(1, n):\n        total += i\n    return total\n\n\ndef last_item(items):\n    return items[len(items)]\n\n\nprint(sum_first(5))              # should print 15 (1+2+3+4+5)\nprint(last_item([\"a\", \"b\", \"c\"]))  # should print c\n",
    tests: `
assert "sum_first" in globals() and callable(sum_first), "Keep the sum_first function."
assert "last_item" in globals() and callable(last_item), "Keep the last_item function."
assert sum_first(5) == 15, f"sum_first(5) should return 15 (1+2+3+4+5), got {sum_first(5)!r}. Is 5 itself included in your range?"
assert sum_first(1) == 1, f"sum_first(1) should return 1, got {sum_first(1)!r}."
assert sum_first(100) == 5050, f"sum_first(100) should return 5050, got {sum_first(100)!r}."
assert last_item(["a", "b", "c"]) == "c", f'last_item(["a", "b", "c"]) should return "c", got {last_item(["a", "b", "c"])!r}.'
assert last_item([42]) == 42, "last_item([42]) should return 42."
`,
    hints: [
      "To include n itself: <code>range(1, n + 1)</code>.",
      "The last valid index is <code>len(items) - 1</code> — or skip the math entirely with <code>items[-1]</code>."
    ],
    solution: "def sum_first(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\n\ndef last_item(items):\n    return items[-1]\n\n\nprint(sum_first(5))\nprint(last_item([\"a\", \"b\", \"c\"]))"
  },
  {
    id: "m12l6",
    type: "lab",
    title: "Fix it: loop errors",
    minutes: 9,
    objective: "The cart total comes out wrong because something is happening on <strong>every lap of the loop</strong> that should happen only once. Use print debugging to catch it in the act.",
    content: [
      { p: "<code>cart_total([2.0, 3.0, 5.0])</code> should return <code>10.0</code> — run it and see what you actually get. Before fixing anything, add a spy print inside the loop (<code>print(f\"DEBUG: {total}\")</code>) and watch the total on each lap. You saw this disease in the techniques lesson — now cure it yourself." },
      { warn: "The other classic loop error is the <em>infinite</em> while loop — a condition that never becomes False because nothing inside changes it. This site's page will freeze if you build one (just reload the tab). Always ask: <em>what line moves this loop toward stopping?</em>" }
    ],
    starter: "def cart_total(prices):\n    for price in prices:\n        total = 0\n        total += price\n    return total\n\n\nprint(cart_total([2.0, 3.0, 5.0]))   # should print 10.0\n",
    tests: `
import math
assert "cart_total" in globals() and callable(cart_total), "Keep the cart_total function."
assert math.isclose(cart_total([2.0, 3.0, 5.0]), 10.0), f"cart_total([2.0, 3.0, 5.0]) should return 10.0, got {cart_total([2.0, 3.0, 5.0])!r}. Watch WHERE total gets set to 0."
assert math.isclose(cart_total([7.5]), 7.5), "cart_total([7.5]) should return 7.5."
assert math.isclose(cart_total([1.0, 1.0, 1.0, 1.0]), 4.0), f"cart_total([1.0, 1.0, 1.0, 1.0]) should return 4.0, got {cart_total([1.0, 1.0, 1.0, 1.0])!r}."
assert "for" in _code, "Keep the for loop — the bug isn't the loop itself."
`,
    hints: [
      "Add <code>print(f\"DEBUG: {total}\")</code> inside the loop and run — the total resets every lap!",
      "The accumulator must start at 0 exactly ONCE, before the loop: move <code>total = 0</code> up and un-indent it."
    ],
    solution: "def cart_total(prices):\n    total = 0\n    for price in prices:\n        total += price\n    return total\n\n\nprint(cart_total([2.0, 3.0, 5.0]))"
  },
  {
    id: "m12l7",
    type: "lab",
    title: "Fix it: function errors",
    minutes: 9,
    objective: "This program crashes with a <code>TypeError</code>-family classic: a function that <strong>prints instead of returns</strong>. Fix the function, not the caller.",
    content: [
      { p: "Run the starter and read the traceback + the 💡 explanation: <code>'NoneType' object has no attribute 'upper'</code>. Translation: <code>tag</code> is <code>None</code>. Why? Because <code>make_tag</code> shows the text on screen but hands <strong>nothing</strong> back to the caller — and a function with no <code>return</code> returns <code>None</code> (Module 8!)." },
      { p: "The caller code at the bottom is correct and must not change — repair the function so it <em>returns</em> the tag string." }
    ],
    starter: "def make_tag(name, role):\n    print(f\"{name} | {role}\")\n\n\n# --- don't change the caller code below ---\ntag = make_tag(\"Ada\", \"Engineer\")\nprint(tag.upper())\n",
    tests: `
import io as _io, contextlib as _cl
assert "make_tag" in globals() and callable(make_tag), "Keep the make_tag function."
_r = make_tag("Ada", "Engineer")
assert _r == "Ada | Engineer", f'make_tag("Ada", "Engineer") should RETURN "Ada | Engineer", got {_r!r}.' + (" It returned None — swap the print for a return!" if _r is None else "")
assert make_tag("Sam", "Chef") == "Sam | Chef", "make_tag must build the tag from its parameters — no hardcoding."
assert "ADA | ENGINEER" in _stdout, "The caller's print(tag.upper()) should work and print ADA | ENGINEER."
assert "tag = make_tag(" in _code, "Keep the caller code (tag = make_tag(...)) unchanged."
`,
    hints: [
      "Inside the function, replace <code>print(...)</code> with <code>return ...</code> — same f-string.",
      "After the fix, the caller receives the string, and <code>tag.upper()</code> has something real to work on."
    ],
    solution: "def make_tag(name, role):\n    return f\"{name} | {role}\"\n\n\n# --- don't change the caller code below ---\ntag = make_tag(\"Ada\", \"Engineer\")\nprint(tag.upper())"
  },
  {
    id: "m12l8",
    type: "lab",
    title: "Fix it: syntax errors",
    minutes: 10,
    objective: "Four separate syntax bugs stand between you and a working program. Fix them <strong>one at a time</strong>, re-running after each fix.",
    content: [
      { p: "Remember: Python only shows the <em>first</em> syntax error it finds — fix it, run again, and the next one appears. That's the game. The four bugs, in no particular order:" },
      { list: [
        "a missing colon at the end of a block-starting line",
        "a single <code>=</code> where a comparison belongs (and the rule is \"60 or higher passes\")",
        "a line indented wrong inside its block",
        "a missing closing parenthesis"
      ]},
      { p: "When everything is fixed, the program prints <code>True</code> then <code>False</code>." }
    ],
    starter: "def is_passing(score)\n    if score = 60:\n        return True\n    else:\n    return False\n\n\nprint(is_passing(75)\nprint(is_passing(42))\n",
    tests: `
assert "is_passing" in globals() and callable(is_passing), "Keep the is_passing function."
assert is_passing(60) is True, f"is_passing(60) should return True (60 or higher passes) — got {is_passing(60)!r}. Check your comparison operator."
assert is_passing(75) is True, "is_passing(75) should return True."
assert is_passing(59) is False, f"is_passing(59) should return False, got {is_passing(59)!r}."
assert ">=" in _code, "The passing rule is '60 or higher' — use >= 60."
_lines = [l.strip() for l in _stdout.split("\\n") if l.strip()]
assert _lines == ["True", "False"], f"The program should print True then False — your output: {_lines}"
`,
    hints: [
      "Bug hunt order = whatever error Python shows first. <code>def is_passing(score)</code> needs a <code>:</code>.",
      "<code>if score = 60:</code> — assignment isn't comparison, and the rule is 60 <em>or higher</em>: <code>if score >= 60:</code>.",
      "<code>return False</code> must be indented 4 spaces deeper than its <code>else:</code>.",
      "Count the parentheses on the first print line."
    ],
    solution: "def is_passing(score):\n    if score >= 60:\n        return True\n    else:\n        return False\n\n\nprint(is_passing(75))\nprint(is_passing(42))"
  }
  ]
},

// ================================================================
// MODULE 10 — CAPSTONE LABS
// ================================================================
{
  id: "m10",
  title: "Capstone Labs",
  blurb: "No new concepts — four real challenges that combine everything you've learned.",
  lessons: [
  {
    id: "m10l1",
    type: "lab",
    title: "Capstone: Password strength checker",
    minutes: 12,
    objective: "Write <code>check_password(password)</code> that returns <code>\"weak\"</code>, <code>\"medium\"</code>, or <code>\"strong\"</code>.",
    content: [
      { p: "The rules:" },
      { list: [
        "<code>\"weak\"</code> — fewer than 8 characters",
        "<code>\"medium\"</code> — 8+ characters, but letters only or digits only",
        "<code>\"strong\"</code> — 8+ characters containing at least one letter AND at least one digit"
      ]},
      { p: "Useful tools: <code>len(password)</code>, and looping over the string (Module 5!) with <code>ch.isdigit()</code> / <code>ch.isalpha()</code> to detect what it contains. Two boolean accumulator variables (<code>has_letter</code>, <code>has_digit</code>) starting as <code>False</code> work beautifully." },
      { tip: "Sketch the skeleton first: the length check can return \"weak\" immediately (early return!), and only then do you need the loop." }
    ],
    starter: "def check_password(password):\n    # 1) too short? return \"weak\" right away\n    # 2) scan the characters: any letters? any digits?\n    # 3) both kinds -> \"strong\", otherwise -> \"medium\"\n    pass  # replace with your code\n\n\n# try it:\n# print(check_password(\"cat\"))\n# print(check_password(\"password\"))\n# print(check_password(\"blue42sky9\"))\n",
    tests: `
assert "check_password" in globals() and callable(check_password), "Define a function called check_password."
_cases = [
    ("cat", "weak"), ("1234567", "weak"), ("", "weak"),
    ("password", "medium"), ("12345678", "medium"), ("ABCDEFGHIJ", "medium"),
    ("blue42sky9", "strong"), ("a1b2c3d4", "strong"), ("PASSWORD9", "strong"),
]
for _pw, _want in _cases:
    _got = check_password(_pw)
    assert _got == _want, f'check_password("{_pw}") should return "{_want}", got {_got!r}.'
`,
    hints: [
      "Start with: <code>if len(password) < 8: return \"weak\"</code>.",
      "Scan: <code>for ch in password:</code> with <code>if ch.isalpha(): has_letter = True</code> and <code>if ch.isdigit(): has_digit = True</code>.",
      "Finish: <code>if has_letter and has_digit: return \"strong\"</code> else <code>return \"medium\"</code>."
    ],
    solution: "def check_password(password):\n    if len(password) < 8:\n        return \"weak\"\n\n    has_letter = False\n    has_digit = False\n    for ch in password:\n        if ch.isalpha():\n            has_letter = True\n        if ch.isdigit():\n            has_digit = True\n\n    if has_letter and has_digit:\n        return \"strong\"\n    return \"medium\"\n\nprint(check_password(\"cat\"))\nprint(check_password(\"password\"))\nprint(check_password(\"blue42sky9\"))"
  },
  {
    id: "m10l2",
    type: "lab",
    title: "Capstone: Word tools",
    minutes: 12,
    objective: "Write two text utilities: <code>count_words(text)</code> and <code>longest_word(text)</code>.",
    content: [
      { p: "You already own every tool this needs: <code>text.split()</code> from the Strings module chops the text into a <strong>list of words</strong>, and from there it's loop-and-accumulator territory:" },
      { list: [
        "<code>count_words(text)</code> — returns how many words the text contains. (A list + <code>len()</code>… that's it.)",
        "<code>longest_word(text)</code> — returns the longest word. It's the \"champion\" algorithm from the lists module, but comparing <code>len(word)</code> instead of the values themselves. If there's a tie, keep the <em>first</em> longest."
      ]},
      { p: "Checkpoints: <code>count_words(\"I love writing Python functions\")</code> → <code>5</code> · <code>longest_word(\"I love writing Python functions\")</code> → <code>\"functions\"</code>" }
    ],
    starter: "def count_words(text):\n    pass  # replace with your code\n\n\ndef longest_word(text):\n    pass  # replace with your code\n\n\n# try them:\n# print(count_words(\"I love writing Python functions\"))\n# print(longest_word(\"I love writing Python functions\"))\n",
    tests: `
assert "count_words" in globals() and callable(count_words), "Define a function called count_words."
assert "longest_word" in globals() and callable(longest_word), "Define a function called longest_word."
assert count_words("I love writing Python functions") == 5, f'count_words("I love writing Python functions") should return 5, got {count_words("I love writing Python functions")!r}.'
assert count_words("hello") == 1, 'count_words("hello") should return 1.'
assert count_words("a b c d e f g") == 7, 'count_words("a b c d e f g") should return 7.'
assert longest_word("I love writing Python functions") == "functions", f'longest_word(...) should return "functions", got {longest_word("I love writing Python functions")!r}.'
assert longest_word("hi there") == "there", 'longest_word("hi there") should return "there".'
assert longest_word("cat dog fox") == "cat", 'longest_word("cat dog fox") should return "cat" (first of the tied longest).'
`,
    hints: [
      "<code>words = text.split()</code> gives you a list. <code>count_words</code> is just <code>return len(words)</code>.",
      "Champion pattern: <code>longest = words[0]</code>, then <code>for word in words:</code> with <code>if len(word) > len(longest):</code>.",
      "Use <code>&gt;</code> (not <code>&gt;=</code>) so the FIRST longest word wins ties."
    ],
    solution: "def count_words(text):\n    words = text.split()\n    return len(words)\n\n\ndef longest_word(text):\n    words = text.split()\n    longest = words[0]\n    for word in words:\n        if len(word) > len(longest):\n            longest = word\n    return longest\n\n\nprint(count_words(\"I love writing Python functions\"))\nprint(longest_word(\"I love writing Python functions\"))"
  },
  {
    id: "m10l3",
    type: "lab",
    title: "Capstone: Secret messages (Caesar cipher)",
    minutes: 15,
    objective: "Write <code>encrypt(message, shift)</code> that shifts every lowercase letter forward through the alphabet, wrapping around after z.",
    content: [
      { p: "The cipher Julius Caesar actually used. With <code>shift=3</code>: a→d, b→e, … x→a, y→b, z→c. Spaces and anything that isn't a lowercase letter pass through unchanged." },
      { p: "Checkpoint: <code>encrypt(\"attack at dawn\", 3)</code> → <code>\"dwwdfn dw gdzq\"</code>" },
      { h: "The tools" },
      { list: [
        "The alphabet as a string constant: <code>alphabet = \"abcdefghijklmnopqrstuvwxyz\"</code>",
        "<code>alphabet.index(ch)</code> — a letter's position (a=0 … z=25). (<code>.index()</code> works on strings and lists alike.)",
        "The wrap-around is the modulo trick from Module 3: <code>(position + shift) % 26</code>",
        "Build the result with a string accumulator: start with <code>result = \"\"</code> and add each translated character with <code>+=</code>"
      ]},
      { tip: "Structure: loop over each <code>ch</code> in the message → <code>if ch in alphabet:</code> translate it, <code>else:</code> keep it as-is. Return the accumulated result at the end." }
    ],
    starter: "def encrypt(message, shift):\n    alphabet = \"abcdefghijklmnopqrstuvwxyz\"\n    result = \"\"\n    # loop over message, translating letters and keeping everything else\n    return result\n\n\n# try it:\n# print(encrypt(\"attack at dawn\", 3))\n",
    tests: `
assert "encrypt" in globals() and callable(encrypt), "Define a function called encrypt."
_r = encrypt("attack at dawn", 3)
assert _r == "dwwdfn dw gdzq", f'encrypt("attack at dawn", 3) should return "dwwdfn dw gdzq", got {_r!r}.'
assert encrypt("abc", 1) == "bcd", f'encrypt("abc", 1) should return "bcd", got {encrypt("abc", 1)!r}.'
assert encrypt("xyz", 3) == "abc", f'encrypt("xyz", 3) should return "abc" (wrap around!), got {encrypt("xyz", 3)!r}.'
assert encrypt("hello world", 0) == "hello world", 'encrypt("hello world", 0) should return the message unchanged.'
assert encrypt("z", 26) == "z", 'encrypt("z", 26) should return "z" (a full-alphabet shift lands where it started).'
assert encrypt("hi there!", 5) == "mn ymjwj!", f'Punctuation passes through: encrypt("hi there!", 5) should return "mn ymjwj!", got {encrypt("hi there!", 5)!r}.'
`,
    hints: [
      "Inside the loop: <code>if ch in alphabet:</code> → find its spot: <code>pos = alphabet.index(ch)</code>.",
      "New letter: <code>alphabet[(pos + shift) % 26]</code>. Add it: <code>result += ...</code>.",
      "The else branch is one line: <code>result += ch</code> — spaces and punctuation survive untouched.",
      "Bonus after passing: decryption is just <code>encrypt(secret, 26 - shift)</code>. Try round-tripping a message!"
    ],
    solution: "def encrypt(message, shift):\n    alphabet = \"abcdefghijklmnopqrstuvwxyz\"\n    result = \"\"\n    for ch in message:\n        if ch in alphabet:\n            pos = alphabet.index(ch)\n            result += alphabet[(pos + shift) % 26]\n        else:\n            result += ch\n    return result\n\n\nprint(encrypt(\"attack at dawn\", 3))"
  },
  {
    id: "m10l4",
    type: "lab",
    title: "Capstone: The grade book",
    minutes: 15,
    objective: "Three functions working as a team: <code>average(scores)</code>, <code>letter_grade(avg)</code>, and <code>report(name, scores)</code>.",
    content: [
      { p: "Your final challenge — a complete miniature program, structured the way real software is:" },
      { list: [
        "<code>average(scores)</code> — takes a <em>list</em> of numbers, returns their average. Loop + accumulator (no <code>sum()</code>!), divided by <code>len(scores)</code>.",
        "<code>letter_grade(avg)</code> — returns <code>\"A\"</code> (90+), <code>\"B\"</code> (80+), <code>\"C\"</code> (70+), <code>\"D\"</code> (60+), or <code>\"F\"</code>. You wrote this logic in Module 4 — now it returns instead of prints.",
        "<code>report(name, scores)</code> — calls <em>both</em> functions and returns the string: <code>NAME: average AVG, grade LETTER</code> with the average rounded to 1 decimal via an f-string's <code>{avg:.1f}</code>."
      ]},
      { p: "Checkpoint: <code>report(\"Ada\", [95, 88, 92])</code> → <code>\"Ada: average 91.7, grade A\"</code>" },
      { p: "When this passes, take a second to appreciate what you built: data flows in through parameters, gets transformed by small single-purpose functions, and flows out through returns. That's software. 🧠" }
    ],
    starter: "def average(scores):\n    pass  # loop + accumulator, then divide\n\n\ndef letter_grade(avg):\n    pass  # if/elif chain that RETURNS the letter\n\n\ndef report(name, scores):\n    pass  # call average() and letter_grade(), return the sentence\n\n\n# try it:\n# print(report(\"Ada\", [95, 88, 92]))\n",
    tests: `
import math
for _fn in ("average", "letter_grade", "report"):
    assert _fn in globals() and callable(globals()[_fn]), f"Define a function called {_fn}."
assert "sum(" not in _code, "Build the average with your own loop instead of sum()."
assert math.isclose(average([95, 88, 92]), 91.666666, rel_tol=1e-4), f"average([95, 88, 92]) should be about 91.67, got {average([95, 88, 92])!r}."
assert math.isclose(average([70, 80]), 75.0), f"average([70, 80]) should be 75.0, got {average([70, 80])!r}."
assert math.isclose(average([100]), 100.0), "average([100]) should be 100.0."
for _avg, _want in [(95, "A"), (90, "A"), (85, "B"), (72, "C"), (65, "D"), (40, "F")]:
    assert letter_grade(_avg) == _want, f'letter_grade({_avg}) should return "{_want}", got {letter_grade(_avg)!r}.'
_r = report("Ada", [95, 88, 92])
assert _r == "Ada: average 91.7, grade A", f'report("Ada", [95, 88, 92]) should return "Ada: average 91.7, grade A", got {_r!r}.'
_r2 = report("Rex", [60, 70, 65])
assert _r2 == "Rex: average 65.0, grade D", f'report("Rex", [60, 70, 65]) should return "Rex: average 65.0, grade D", got {_r2!r}.'
import re as _re
_body = _re.search(r"def\\s+report[\\s\\S]*", _code).group(0)
assert "average(" in _body and "letter_grade(" in _body, "report() should CALL average() and letter_grade() — teamwork, not copy-paste!"
`,
    hints: [
      "average: <code>total = 0</code>, loop <code>for s in scores: total += s</code>, then <code>return total / len(scores)</code>.",
      "letter_grade returns: <code>if avg >= 90: return \"A\"</code> … chain downward, ending with <code>return \"F\"</code>.",
      "report: <code>avg = average(scores)</code>, <code>grade = letter_grade(avg)</code>, then <code>return f\"{name}: average {avg:.1f}, grade {grade}\"</code>."
    ],
    solution: "def average(scores):\n    total = 0\n    for s in scores:\n        total += s\n    return total / len(scores)\n\n\ndef letter_grade(avg):\n    if avg >= 90:\n        return \"A\"\n    elif avg >= 80:\n        return \"B\"\n    elif avg >= 70:\n        return \"C\"\n    elif avg >= 60:\n        return \"D\"\n    else:\n        return \"F\"\n\n\ndef report(name, scores):\n    avg = average(scores)\n    grade = letter_grade(avg)\n    return f\"{name}: average {avg:.1f}, grade {grade}\"\n\n\nprint(report(\"Ada\", [95, 88, 92]))"
  }
  ]
}

];
