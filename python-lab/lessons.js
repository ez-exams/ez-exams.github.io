const MODULES = [
    // =====================================================================
    // DAY 1: PYTHON FOUNDATIONS (Udemy 100 Days of Python - Days 1, 2 & 3)
    // =====================================================================
    {
        id: 'day1',
        title: 'Day 1: Python Foundations',
        description: 'Start from zero - printing, input, variables, data types, math operations, and conditionals.',
        items: [
            // --- LESSON 1: Printing, Input & Strings ---
            {
                id: 'day1-lesson1',
                type: 'lesson',
                title: 'Printing, Input & Strings',
                content: `
<h1>Printing, Input & Strings</h1>
<p>Every Python journey starts with putting text on the screen. The <code>print()</code> function is your window into what your program is doing.</p>

<h2>The <code>print()</code> Function</h2>
<p>Use <code>print()</code> to display text, numbers, and results:</p>

<div class="code-block" data-example="d1l1_print">
<code>print("Hello, World!")
print("Welcome to 100 Days of Python!")
print("Let's get started!")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-tip">
<strong>Why "Hello, World!"?</strong>
It's a tradition! Almost every programmer's first line of code in a new language is printing "Hello, World!" - you're now part of the club.
</div>

<h2>Strings - Text in Python</h2>
<p>Text in Python is called a <strong>string</strong>. Wrap it in quotes - single <code>'</code> or double <code>"</code> both work:</p>

<div class="code-block" data-example="d1l1_strings">
<code>print("Double quotes work")
print('Single quotes also work')

# Use the other quote type to include quotes in text
print("It's a beautiful day")
print('She said "hello"')

# String concatenation - gluing strings together with +
print("Hello" + " " + "World")

# String multiplication
print("Python " * 3)</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>The <code>input()</code> Function</h2>
<p><code>input()</code> asks the user to type something and gives you back a <strong>string</strong>. This is how your programs become interactive:</p>

<div class="code-block" data-example="d1l1_input">
<code># In PyCharm, this will actually pause and wait for you to type
# In this browser, we simulate the input
name = "Angela"  # In PyCharm: name = input("What is your name? ")
print("Hello, " + name + "!")

city = "London"  # In PyCharm: city = input("What city do you live in? ")
print("You live in " + city)</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-warning">
<strong>PyCharm vs Browser</strong>
In this web app, we simulate <code>input()</code> with hardcoded values. When you run these in <strong>PyCharm</strong>, replace the hardcoded values with real <code>input()</code> calls and the program will actually wait for you to type!
</div>

<h2>The <code>len()</code> Function</h2>
<p><code>len()</code> tells you how many characters are in a string (or items in a list):</p>

<div class="code-block" data-example="d1l1_len">
<code>name = "Angela"
print(len(name))  # 6

print(len("Hello World"))  # 11 (space counts!)

# Useful for validation
password = "abc123"
print(f"Password length: {len(password)} characters")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>String Manipulation</h2>
<p>Strings have powerful built-in methods for transforming text:</p>

<div class="code-block" data-example="d1l1_strmanip">
<code>text = "Hello, World"

print(text.upper())       # HELLO, WORLD
print(text.lower())       # hello, world
print(text.title())       # Hello, World
print(text.count("l"))    # 3
print(text.replace("World", "Python"))  # Hello, Python

# Stripping whitespace
messy = "   extra spaces   "
print(messy.strip())      # "extra spaces"</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Comments</h2>
<p>Comments are notes for humans - Python ignores them. Use <code>#</code>:</p>

<div class="code-block" data-example="d1l1_comments">
<code># This is a comment - Python skips it
print("This runs!")  # Inline comment

# Use comments to explain WHY, not WHAT
# Good: Convert to Fahrenheit because the API returns Celsius
# Bad: Print the number</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Debugging with <code>print()</code></h2>
<p>When your code isn't working, sprinkle in <code>print()</code> calls to see what's happening:</p>

<div class="code-block" data-example="d1l1_debug">
<code>word = "Python"
letter_count = len(word)
print(f"DEBUG: letter_count = {letter_count}")

# Common beginner bug: printing vs using a value
result = len("hello")  # Stores 5 in result
print(result)           # Now we see it</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-tip">
<strong>Key Takeaway</strong>
<code>print()</code> shows output, <code>input()</code> gets user text (always a string), <code>len()</code> counts characters. Master these three and you're off to a great start.
</div>
`
            },

            // --- LESSON 2: Variables, Data Types & Math ---
            {
                id: 'day1-lesson2',
                type: 'lesson',
                title: 'Variables, Data Types & Math',
                content: `
<h1>Variables, Data Types & Math</h1>
<p>Variables store data so you can use it later. Python has several built-in data types, and you can do math with numbers effortlessly.</p>

<h2>Creating Variables</h2>
<p>Use <code>=</code> to assign a value to a name:</p>

<div class="code-block" data-example="d1l2_vars">
<code>name = "Alice"
age = 25
height = 5.7
is_student = True

print(name)
print(age)
print(height)
print(is_student)</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-tip">
<strong>Variable Naming Rules</strong>
<ul>
<li>Must start with a letter or underscore</li>
<li>Can contain letters, numbers, underscores</li>
<li>Case-sensitive (<code>Name</code> != <code>name</code>)</li>
<li>Use <code>snake_case</code> by convention: <code>user_name</code>, <code>birth_year</code></li>
<li>Cannot use Python keywords like <code>if</code>, <code>for</code>, <code>print</code></li>
</ul>
</div>

<h2>Python's Data Types</h2>
<p>Every value has a type. The four fundamental types are:</p>
<ul>
    <li><code>int</code> - Whole numbers: <code>42</code>, <code>-7</code>, <code>0</code></li>
    <li><code>float</code> - Decimal numbers: <code>3.14</code>, <code>-0.5</code>, <code>100.0</code></li>
    <li><code>str</code> - Text (strings): <code>"hello"</code>, <code>'world'</code></li>
    <li><code>bool</code> - True or False: <code>True</code>, <code>False</code></li>
</ul>

<div class="code-block" data-example="d1l2_types">
<code># Check types with type()
print(type(42))        # <class 'int'>
print(type(3.14))      # <class 'float'>
print(type("hello"))   # <class 'str'>
print(type(True))      # <class 'bool'>

# Important: input() ALWAYS returns a string!
age_input = "25"       # Simulating input()
print(type(age_input)) # <class 'str'> - it's text, not a number!</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Type Conversion (Casting)</h2>
<p>Since <code>input()</code> always gives you a string, you often need to convert types:</p>

<div class="code-block" data-example="d1l2_casting">
<code># String to Integer
age_text = "25"
age = int(age_text)
print(age + 5)        # 30 (math works now!)

# String to Float
price_text = "19.99"
price = float(price_text)
print(price * 2)      # 39.98

# Number to String
score = 100
message = "Score: " + str(score)
print(message)

# Float to Integer (truncates - cuts off decimal)
print(int(9.7))   # 9 (not rounded!)
print(int(3.2))   # 3</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Mathematical Operators</h2>
<p>Python supports all standard math operations, plus a few extras:</p>

<div class="code-block" data-example="d1l2_math">
<code>print(10 + 3)    # 13  - Addition
print(10 - 3)    # 7   - Subtraction
print(10 * 3)    # 30  - Multiplication
print(10 / 3)    # 3.333... - Division (always returns float)
print(10 // 3)   # 3   - Floor Division (rounds down)
print(10 % 3)    # 1   - Modulo (remainder)
print(10 ** 3)   # 1000 - Exponentiation (power)

# PEMDAS / Order of Operations
# Parentheses -> Exponents -> Multiply/Divide -> Add/Subtract
print(3 + 5 * 2)       # 13 (not 16!)
print((3 + 5) * 2)     # 16 (parentheses first)</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>The <code>round()</code> Function</h2>
<div class="code-block" data-example="d1l2_round">
<code>pi = 3.14159265

print(round(pi))       # 3 (nearest integer)
print(round(pi, 2))    # 3.14 (2 decimal places)
print(round(pi, 4))    # 3.1416

# Useful for money calculations
total = 24.991
dollar = "$"
print(f"Total: {dollar}{round(total, 2)}")  # Total: $24.99</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>f-Strings - Modern String Formatting</h2>
<p>F-strings let you embed variables and expressions directly inside strings. They start with <code>f</code> before the quote:</p>

<div class="code-block" data-example="d1l2_fstrings">
<code>name = "Alice"
age = 25
gpa = 3.856

# Embed variables
print(f"My name is {name}")
print(f"{name} is {age} years old")

# Embed expressions
print(f"In 10 years: {age + 10}")
print(f"Name in caps: {name.upper()}")

# Format numbers
print(f"GPA: {gpa:.2f}")        # 3.86 (2 decimal places)
print(f"Big number: {1000000:,}") # 1,000,000</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Shorthand Operators</h2>
<div class="code-block" data-example="d1l2_shorthand">
<code>score = 0
score += 10   # Same as: score = score + 10
print(score)  # 10

score -= 3    # score = score - 3
print(score)  # 7

score *= 2    # score = score * 2
print(score)  # 14

score /= 7    # score = score / 7
print(score)  # 2.0</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-tip">
<strong>Key Takeaway</strong>
<code>input()</code> always returns a <strong>string</strong>. Use <code>int()</code> or <code>float()</code> to convert when you need to do math. F-strings (<code>f"..."</code>) are the cleanest way to mix variables into text.
</div>
`
            },

            // --- LESSON 3: Conditionals & Logic ---
            {
                id: 'day1-lesson3',
                type: 'lesson',
                title: 'Conditionals & Logic',
                content: `
<h1>Conditionals & Logic</h1>
<p>Programs need to make decisions. Python uses <code>if</code>, <code>elif</code>, and <code>else</code> to run different code depending on conditions.</p>

<h2>The <code>if</code> Statement</h2>
<p>The simplest decision: do something <em>only if</em> a condition is true:</p>

<div class="code-block" data-example="d1l3_if">
<code>temperature = 35

if temperature > 30:
    print("It's hot outside!")
    print("Stay hydrated!")

print("Have a good day!")  # Always runs (not indented under if)</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-warning">
<strong>Indentation Is Everything!</strong>
Python uses indentation (4 spaces) to group code. Everything indented under the <code>if</code> only runs when the condition is true. Get the indentation wrong and your program breaks!
</div>

<h2>Comparison Operators</h2>
<p>These operators compare values and produce <code>True</code> or <code>False</code>:</p>
<ul>
    <li><code>==</code> Equal to (note: double equals!)</li>
    <li><code>!=</code> Not equal to</li>
    <li><code>&gt;</code> Greater than</li>
    <li><code>&lt;</code> Less than</li>
    <li><code>&gt;=</code> Greater than or equal</li>
    <li><code>&lt;=</code> Less than or equal</li>
</ul>

<div class="code-block" data-example="d1l3_compare">
<code>print(10 == 10)   # True
print(10 != 5)    # True
print(10 > 20)    # False
print(5 <= 5)     # True

# Common beginner mistake: = vs ==
# = is assignment:  x = 5 (sets x to 5)
# == is comparison: x == 5 (checks if x equals 5)</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2><code>if / else</code></h2>
<p>Do one thing if true, another thing if false:</p>

<div class="code-block" data-example="d1l3_ifelse">
<code>age = 16

if age >= 18:
    print("You can vote!")
else:
    print("Sorry, you're too young to vote")
    years_left = 18 - age
    print(f"Come back in {years_left} years")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2><code>if / elif / else</code></h2>
<p>Check multiple conditions in order. Only the <strong>first</strong> matching branch runs:</p>

<div class="code-block" data-example="d1l3_elif">
<code>score = 85

if score >= 90:
    grade = "A"
    print("Outstanding!")
elif score >= 80:
    grade = "B"
    print("Great job!")
elif score >= 70:
    grade = "C"
    print("Not bad")
elif score >= 60:
    grade = "D"
    print("Needs improvement")
else:
    grade = "F"
    print("Please see the teacher")

print(f"Score: {score} -> Grade: {grade}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Nested <code>if</code> Statements</h2>
<p>Put an <code>if</code> inside another <code>if</code> for more complex logic:</p>

<div class="code-block" data-example="d1l3_nested">
<code>has_ticket = True
age = 15

if has_ticket:
    if age >= 18:
        print("You may ride the rollercoaster!")
    elif age >= 12:
        print("You may ride, but with a parent")
    else:
        print("Sorry, you're too young for this ride")
else:
    print("You need to buy a ticket first!")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Logical Operators</h2>
<p>Combine conditions with <code>and</code>, <code>or</code>, and <code>not</code>:</p>

<div class="code-block" data-example="d1l3_logical">
<code>age = 25
has_license = True

# and - BOTH conditions must be true
if age >= 16 and has_license:
    print("You can drive!")

# or - AT LEAST ONE condition must be true
day = "Saturday"
if day == "Saturday" or day == "Sunday":
    print("It's the weekend!")

# not - reverses a condition
is_raining = False
if not is_raining:
    print("No umbrella needed!")

# Combining multiple
temperature = 72
is_sunny = True
if temperature > 60 and temperature < 85 and is_sunny:
    print("Perfect weather for a walk!")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>The Modulo Operator for Even/Odd</h2>
<p>The <code>%</code> (modulo) operator gives the remainder after division. It's perfect for checking even/odd:</p>

<div class="code-block" data-example="d1l3_modulo">
<code>number = 7

if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")

# Modulo is also great for checking divisibility
year = 2024
if year % 4 == 0:
    print(f"{year} might be a leap year!")

# Check if a number is divisible by 5
num = 25
if num % 5 == 0:
    print(f"{num} is divisible by 5")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-tip">
<strong>Key Takeaway</strong>
Use <code>if</code> for single checks, <code>elif</code> for multiple exclusive options, and <code>else</code> as a catch-all. Remember: <code>=</code> assigns, <code>==</code> compares. Use <code>and</code>, <code>or</code>, <code>not</code> to combine conditions.
</div>
`
            },

            // --- LAB 1: Band Name Generator (Day 1 Project) ---
            {
                id: 'day1-lab1',
                type: 'lab',
                title: 'Project: Band Name Generator',
                objective: 'Build a program that creates a band name by combining the user\'s city and pet name - your first real Python project!',
                instructions: `
<h3>The Project (from Udemy Day 1)</h3>
<p>Create a band name generator that:</p>
<ol>
    <li>Stores a city name in a variable called <code>city</code></li>
    <li>Stores a pet name in a variable called <code>pet_name</code></li>
    <li>Combines them into a band name with a space between</li>
    <li>Stores the result in a variable called <code>band_name</code></li>
    <li>Prints: <code>Your band name is: [band_name]</code></li>
</ol>
<p><strong>PyCharm Tip:</strong> In PyCharm, replace the hardcoded values with <code>input("Which city did you grow up in? ")</code> and <code>input("What is your pet's name? ")</code></p>
`,
                starterCode: `# Band Name Generator - Day 1 Project
# In PyCharm, use input() instead of hardcoded values

# Step 1: Store the city name
city = ""  # Put a city name here (or use input() in PyCharm)

# Step 2: Store the pet name
pet_name = ""  # Put a pet name here (or use input() in PyCharm)

# Step 3: Combine them into a band name
band_name = ""  # Combine city and pet_name with a space

# Step 4: Print the result
# print(f"Your band name is: {band_name}")
`,
                tests: [
                    { name: 'city is a non-empty string', test: `assert isinstance(city, str) and len(city) > 0, "city should be a non-empty string"` },
                    { name: 'pet_name is a non-empty string', test: `assert isinstance(pet_name, str) and len(pet_name) > 0, "pet_name should be a non-empty string"` },
                    { name: 'band_name combines city and pet_name', test: `assert city in band_name and pet_name in band_name, f"band_name should contain both city and pet_name"` },
                    { name: 'Output contains the band name', test: `assert band_name in __captured_output__, "Output should contain your band name"` }
                ],
                hints: [
                    'Set <code>city</code> to any city: <code>city = "Tokyo"</code>',
                    'Set <code>pet_name</code> to any name: <code>pet_name = "Rex"</code>',
                    'Combine with: <code>band_name = city + " " + pet_name</code>',
                    'Or use an f-string: <code>band_name = f"{city} {pet_name}"</code>'
                ]
            },

            // --- LAB 2: Tip Calculator (Day 2 Project) ---
            {
                id: 'day1-lab2',
                type: 'lab',
                title: 'Project: Tip Calculator',
                objective: 'Build a tip calculator that splits a restaurant bill between friends, including a tip percentage.',
                instructions: `
<h3>The Project (from Udemy Day 2)</h3>
<p>Create a tip calculator that:</p>
<ol>
    <li>Has a total bill amount in <code>bill</code> (float)</li>
    <li>Has a tip percentage in <code>tip_percent</code> (int: 10, 12, or 15)</li>
    <li>Has the number of people splitting in <code>people</code> (int)</li>
    <li>Calculates the tip amount: <code>tip = bill * (tip_percent / 100)</code></li>
    <li>Calculates total with tip: <code>total = bill + tip</code></li>
    <li>Calculates each person's share: <code>per_person = total / people</code></li>
    <li>Rounds <code>per_person</code> to 2 decimal places</li>
    <li>Prints: <code>Each person should pay: $XX.XX</code></li>
</ol>
<p><strong>PyCharm Tip:</strong> Use <code>bill = float(input("What was the total bill? $"))</code></p>
`,
                starterCode: `# Tip Calculator - Day 2 Project
# In PyCharm, use input() for all three values

bill = 124.56       # In PyCharm: float(input("What was the total bill? $"))
tip_percent = 15    # In PyCharm: int(input("What tip percentage? 10, 12, or 15? "))
people = 4          # In PyCharm: int(input("How many people to split the bill? "))

# Calculate tip amount
# tip = ...

# Calculate total bill with tip
# total = ...

# Calculate each person's share (round to 2 decimals)
# per_person = ...

# Print the result
# print(f"Each person should pay: " + "$" + str(per_person))
`,
                tests: [
                    { name: 'tip is calculated correctly', test: `expected_tip = bill * (tip_percent / 100); assert abs(tip - expected_tip) < 0.01, f"tip should be {expected_tip}, got {tip}"` },
                    { name: 'total includes bill + tip', test: `assert abs(total - (bill + tip)) < 0.01, f"total should be bill + tip = {bill + tip}, got {total}"` },
                    { name: 'per_person is total / people, rounded', test: `expected = round((bill + bill * (tip_percent / 100)) / people, 2); assert abs(per_person - expected) < 0.01, f"per_person should be {expected}, got {per_person}"` },
                    { name: 'Output shows the per-person amount', test: `assert str(per_person) in __captured_output__, "Output should contain the per-person amount"` }
                ],
                hints: [
                    'Calculate tip: <code>tip = bill * (tip_percent / 100)</code>',
                    'Calculate total: <code>total = bill + tip</code>',
                    'Calculate per person: <code>per_person = round(total / people, 2)</code>',
                    'Print it: <code>print("Each person should pay: $" + str(per_person))</code>'
                ]
            },

            // --- LAB 3: Treasure Island (Day 3 Project) ---
            {
                id: 'day1-lab3',
                type: 'lab',
                title: 'Project: Treasure Island',
                objective: 'Build a text-based choose-your-own-adventure game using if/elif/else - Treasure Island!',
                instructions: `
<h3>The Project (from Udemy Day 3)</h3>
<p>Create a Treasure Island adventure game! The player makes 3 choices:</p>
<ol>
    <li><strong>Crossroads:</strong> Set <code>choice1</code> to <code>"left"</code> or <code>"right"</code>
        <ul><li>If <code>"right"</code> -> print <code>"You fell into a hole. Game Over."</code> and set <code>game_over = True</code></li></ul>
    </li>
    <li><strong>Lake:</strong> Set <code>choice2</code> to <code>"swim"</code> or <code>"wait"</code>
        <ul><li>If <code>"swim"</code> -> print <code>"Attacked by trout. Game Over."</code></li></ul>
    </li>
    <li><strong>Doors:</strong> Set <code>choice3</code> to <code>"red"</code>, <code>"blue"</code>, or <code>"yellow"</code>
        <ul>
            <li><code>"red"</code> -> print <code>"Burned by fire. Game Over."</code></li>
            <li><code>"blue"</code> -> print <code>"Eaten by beasts. Game Over."</code></li>
            <li><code>"yellow"</code> -> print <code>"You Win!"</code></li>
        </ul>
    </li>
</ol>
<p>Store the final result message in a variable called <code>result</code>. The winning path is: left -> wait -> yellow.</p>
`,
                starterCode: `# Treasure Island - Day 3 Project
print("Welcome to Treasure Island!")
print("Your mission is to find the treasure.\\n")

# Set to True if the player dies
game_over = False
result = ""

# Choice 1: Crossroads
choice1 = "left"  # In PyCharm: input("You're at a crossroads. Go 'left' or 'right'? ").lower()

if choice1 == "right":
    result = "You fell into a hole. Game Over."
    game_over = True
    # Fill in: set result and game_over

# Choice 2: The Lake (only if still alive)
choice2 = "wait"  # In PyCharm: input("You come to a lake. 'swim' or 'wait' for a boat? ").lower()

# Write your if/else for choice2 here
# If swim -> "Attacked by trout. Game Over."
# Only check if game_over is still False!


# Choice 3: The Doors (only if still alive)
choice3 = "yellow"  # In PyCharm: input("You see 3 doors: 'red', 'blue', 'yellow'. Which one? ").lower()

# Write your if/elif/else for choice3 here
# red -> "Burned by fire. Game Over."
# blue -> "Eaten by beasts. Game Over."
# yellow -> "You Win!"
# Only check if game_over is still False!


print(result)
`,
                tests: [
                    { name: 'Left + wait + yellow = You Win', test: `
choice1 = "left"; choice2 = "wait"; choice3 = "yellow"
game_over = False; result = ""
if choice1 == "right": game_over = True; result = "You fell into a hole. Game Over."
if not game_over and choice2 == "swim": game_over = True; result = "Attacked by trout. Game Over."
if not game_over:
    if choice3 == "red": result = "Burned by fire. Game Over."
    elif choice3 == "blue": result = "Eaten by beasts. Game Over."
    elif choice3 == "yellow": result = "You Win!"
assert "Win" in __captured_output__ or "win" in __captured_output__, "left + wait + yellow should result in winning"
` },
                    { name: 'result variable is set', test: `assert len(result) > 0, "result should contain the outcome message"` },
                    { name: 'game_over is a boolean', test: `assert isinstance(game_over, bool), "game_over should be True or False"` }
                ],
                hints: [
                    'For choice2, wrap it in <code>if not game_over:</code> so it only runs if the player is still alive',
                    'Choice2: <code>if choice2 == "swim": result = "Attacked by trout. Game Over."; game_over = True</code>',
                    'For choice3, use <code>if/elif/else</code> inside another <code>if not game_over:</code> block',
                    'The winning path: <code>if choice3 == "yellow": result = "You Win!"</code>'
                ]
            }
        ]
    },

    // =====================================================================
    // DAY 2: LISTS, LOOPS & FUNCTIONS (Udemy Days 4, 5, 6 & 7)
    // =====================================================================
    {
        id: 'day2',
        title: 'Day 2: Lists, Loops & Functions',
        description: 'Work with lists, generate random values, repeat actions with loops, and organize code into functions.',
        items: [
            // --- LESSON 1: Randomisation & Lists ---
            {
                id: 'day2-lesson1',
                type: 'lesson',
                title: 'Randomisation & Lists',
                content: `
<h1>Randomisation & Lists</h1>
<p>Randomness makes programs unpredictable (great for games!), and lists let you store collections of related items.</p>

<h2>The <code>random</code> Module</h2>
<p>Python's <code>random</code> module gives you tools for generating random values. You must import it first:</p>

<div class="code-block" data-example="d2l1_random">
<code>import random

# Random integer between a and b (inclusive)
dice_roll = random.randint(1, 6)
print(f"You rolled: {dice_roll}")

# Random float between 0 and 1
coin = random.random()
print(f"Random float: {coin}")
if coin > 0.5:
    print("Heads!")
else:
    print("Tails!")

# Random choice from a list
meals = ["pizza", "sushi", "tacos", "salad", "burger"]
dinner = random.choice(meals)
print(f"Tonight's dinner: {dinner}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Creating Lists</h2>
<p>Lists store multiple items in order, using square brackets <code>[]</code>:</p>

<div class="code-block" data-example="d2l1_lists">
<code>fruits = ["apple", "banana", "cherry", "date"]
numbers = [10, 20, 30, 40, 50]
mixed = [1, "hello", 3.14, True]
empty = []

print(fruits)
print(f"Number of fruits: {len(fruits)}")
print(f"Number list: {numbers}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Accessing List Items</h2>
<p>Items are numbered starting from <strong>0</strong>. You can also count backwards with negative indices:</p>

<div class="code-block" data-example="d2l1_index">
<code>fruits = ["apple", "banana", "cherry", "date"]

print(fruits[0])    # apple (first item)
print(fruits[1])    # banana (second item)
print(fruits[-1])   # date (last item)
print(fruits[-2])   # cherry (second to last)

# Change an item
fruits[1] = "blueberry"
print(fruits)  # ['apple', 'blueberry', 'cherry', 'date']</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-warning">
<strong>IndexError!</strong>
If you try to access an index that doesn't exist (like <code>fruits[10]</code> when the list only has 4 items), Python will crash with an <code>IndexError</code>. Always check <code>len()</code> if unsure!
</div>

<h2>List Methods - Adding & Removing</h2>
<div class="code-block" data-example="d2l1_methods">
<code>fruits = ["apple", "banana"]

# Adding items
fruits.append("cherry")         # Add to end
fruits.insert(0, "avocado")     # Insert at position 0
fruits.extend(["date", "elderberry"])  # Add multiple items
print("After adding:", fruits)

# Removing items
fruits.remove("banana")         # Remove by value
last = fruits.pop()             # Remove & return last item
print(f"Popped: {last}")
del fruits[0]                   # Delete by index
print("After removing:", fruits)</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>List Slicing</h2>
<div class="code-block" data-example="d2l1_slice">
<code>numbers = [10, 20, 30, 40, 50, 60, 70]

print(numbers[1:4])    # [20, 30, 40]
print(numbers[:3])     # [10, 20, 30] (first 3)
print(numbers[4:])     # [50, 60, 70] (from index 4 on)
print(numbers[::2])    # [10, 30, 50, 70] (every 2nd)
print(numbers[::-1])   # [70, 60, 50, 40, 30, 20, 10] (reversed)</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Nested Lists</h2>
<p>A list can contain other lists - this creates a 2D structure:</p>

<div class="code-block" data-example="d2l1_nested">
<code># A 3x3 grid (like tic-tac-toe)
grid = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["O", "X", "X"]
]

# Access: grid[row][column]
print(grid[0])      # First row: ['X', 'O', 'X']
print(grid[0][2])   # First row, third column: 'X'
print(grid[2][0])   # Third row, first column: 'O'

# Dirty dozen & clean fifteen example
fruits = [
    ["Strawberries", "Spinach", "Kale"],     # Dirty
    ["Avocados", "Sweet Corn", "Pineapple"]  # Clean
]
print(f"Dirty: {fruits[0]}")
print(f"Clean: {fruits[1]}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-tip">
<strong>Key Takeaway</strong>
Lists are ordered, changeable collections. Use <code>random.choice()</code> to pick a random item, <code>.append()</code> to add, <code>.pop()</code> to remove. Indexing starts at 0.
</div>
`
            },

            // --- LESSON 2: For Loops & Range ---
            {
                id: 'day2-lesson2',
                type: 'lesson',
                title: 'For Loops & Range',
                content: `
<h1>For Loops & Range</h1>
<p>Loops let you repeat code. The <code>for</code> loop walks through each item in a sequence, one at a time.</p>

<h2>Looping Through a List</h2>
<div class="code-block" data-example="d2l2_forlist">
<code>fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I love {fruit}")

print("---")

# The variable name is up to you
students = ["Alice", "Bob", "Carol"]
for student in students:
    print(f"Hello, {student}!")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>The <code>range()</code> Function</h2>
<p><code>range()</code> generates a sequence of numbers - perfect for counting loops:</p>

<div class="code-block" data-example="d2l2_range">
<code># range(stop) - from 0 to stop-1
for i in range(5):
    print(i, end=" ")  # 0 1 2 3 4
print()

# range(start, stop) - from start to stop-1
for i in range(1, 6):
    print(i, end=" ")  # 1 2 3 4 5
print()

# range(start, stop, step)
for i in range(0, 30, 5):
    print(i, end=" ")  # 0 5 10 15 20 25
print()

# Counting backwards
for i in range(5, 0, -1):
    print(i, end=" ")  # 5 4 3 2 1
print("Go!")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>The Accumulator Pattern</h2>
<p>One of the most common loop patterns - build up a result as you go:</p>

<div class="code-block" data-example="d2l2_accumulator">
<code># Sum all numbers
numbers = [14, 7, 23, 42, 8]
total = 0
for num in numbers:
    total += num
print(f"Sum: {total}")

# Find the largest number
largest = numbers[0]
for num in numbers:
    if num > largest:
        largest = num
print(f"Largest: {largest}")

# Count how many are even
even_count = 0
for num in numbers:
    if num % 2 == 0:
        even_count += 1
print(f"Even numbers: {even_count}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Looping Through Strings</h2>
<p>Strings are sequences too - you can loop through each character:</p>

<div class="code-block" data-example="d2l2_strloop">
<code>name = "Python"

for letter in name:
    print(letter, end=" ")
print()

# Count vowels
word = "beautiful"
vowel_count = 0
for char in word:
    if char.lower() in "aeiou":
        vowel_count += 1
print(f"'{word}' has {vowel_count} vowels")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Common Patterns with <code>for</code> Loops</h2>
<div class="code-block" data-example="d2l2_patterns">
<code># Calculate average
scores = [85, 92, 78, 90, 88]
total = 0
for score in scores:
    total += score
average = total / len(scores)
print(f"Average score: {average}")

# Build a new list from an existing one
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = []
for num in numbers:
    if num % 2 == 0:
        even_numbers.append(num)
print(f"Even: {even_numbers}")

# Add up a total with range
total = 0
for i in range(1, 101):
    total += i
print(f"Sum of 1 to 100: {total}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-tip">
<strong>Key Takeaway</strong>
Use <code>for item in list</code> to process each item. Use <code>for i in range(n)</code> when you need a counter. The accumulator pattern (start with 0 or [], add as you go) solves most loop problems.
</div>
`
            },

            // --- LESSON 3: Functions & While Loops ---
            {
                id: 'day2-lesson3',
                type: 'lesson',
                title: 'Functions & While Loops',
                content: `
<h1>Functions & While Loops</h1>
<p>Functions are reusable blocks of code, and <code>while</code> loops repeat until a condition changes.</p>

<h2>Defining Functions</h2>
<p>Use <code>def</code> to create a function. Indent the body:</p>

<div class="code-block" data-example="d2l3_func">
<code>def greet():
    print("Hello!")
    print("Welcome to Python!")

# Call the function
greet()
greet()  # Call it as many times as you want</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-warning">
<strong>Indentation!</strong>
Everything inside the function must be indented by 4 spaces. The function ends when the indentation goes back to the original level. This is the same rule as <code>if</code>, <code>for</code>, and <code>while</code>.
</div>

<h2>Functions with Inputs</h2>
<p>Parameters let you pass data into functions:</p>

<div class="code-block" data-example="d2l3_params">
<code>def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
greet("Bob")

# Multiple parameters
def add(a, b):
    print(f"{a} + {b} = {a + b}")

add(3, 5)
add(100, 200)</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>The <code>while</code> Loop</h2>
<p>A <code>while</code> loop repeats as long as its condition is <code>True</code>:</p>

<div class="code-block" data-example="d2l3_while">
<code># Count from 1 to 5
count = 1
while count <= 5:
    print(count, end=" ")
    count += 1
print("Done!")

# Countdown
seconds = 5
while seconds > 0:
    print(f"{seconds}...")
    seconds -= 1
print("Liftoff!")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-warning">
<strong>Avoid Infinite Loops!</strong>
If the condition never becomes <code>False</code>, the loop runs forever. Always make sure something inside the loop changes the condition.
</div>

<h2>Using Flags with <code>while</code></h2>
<p>A common pattern is to use a boolean "flag" variable to control the loop:</p>

<div class="code-block" data-example="d2l3_flag">
<code>game_over = False
lives = 3
score = 0

while not game_over:
    score += 10
    lives -= 1
    print(f"Score: {score}, Lives: {lives}")
    
    if lives == 0:
        game_over = True

print(f"Game Over! Final score: {score}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2><code>break</code> and <code>continue</code></h2>
<p><code>break</code> exits the loop immediately. <code>continue</code> skips to the next iteration:</p>

<div class="code-block" data-example="d2l3_break">
<code># break - exit the loop
for num in range(1, 20):
    if num > 5:
        break
    print(num, end=" ")
print("\\nLoop ended early!")

# continue - skip this iteration
print("Odd numbers only:")
for num in range(1, 11):
    if num % 2 == 0:
        continue
    print(num, end=" ")
print()</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Combining <code>while</code> with Functions</h2>
<div class="code-block" data-example="d2l3_combo">
<code>import random

def roll_dice():
    return random.randint(1, 6)

def play_round():
    roll = roll_dice()
    print(f"You rolled: {roll}")
    return roll

# Keep rolling until you get a 6
attempts = 0
result = 0
while result != 6:
    result = play_round()
    attempts += 1

print(f"Got a 6 after {attempts} attempts!")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-tip">
<strong>Key Takeaway</strong>
Functions make code reusable and organized. Use <code>while</code> when you don't know how many iterations you need. Use <code>for</code> when iterating over a collection or counting. <code>break</code> exits a loop, <code>continue</code> skips one iteration.
</div>
`
            },

            // --- LAB 1: Rock Paper Scissors (Day 4 Project) ---
            {
                id: 'day2-lab1',
                type: 'lab',
                title: 'Project: Rock Paper Scissors',
                objective: 'Build a Rock Paper Scissors game where the player competes against the computer using random choice!',
                instructions: `
<h3>The Project (from Udemy Day 4)</h3>
<ol>
    <li>Create a list called <code>choices</code> containing <code>"rock"</code>, <code>"paper"</code>, <code>"scissors"</code></li>
    <li>Set <code>player_choice</code> to one of the three options</li>
    <li>Use <code>random.choice()</code> to pick the computer's choice, store in <code>computer_choice</code></li>
    <li>Print both choices</li>
    <li>Determine the winner using if/elif/else and store the result in <code>result</code>:
        <ul>
            <li>Same choice -> <code>"draw"</code></li>
            <li>Rock beats Scissors, Scissors beats Paper, Paper beats Rock</li>
            <li>Player wins -> <code>"win"</code>, Computer wins -> <code>"lose"</code></li>
        </ul>
    </li>
    <li>Print the result message</li>
</ol>
`,
                starterCode: `import random

# The three choices
choices = ["rock", "paper", "scissors"]

# Player's choice (in PyCharm: input("Rock, paper, or scissors? ").lower())
player_choice = "rock"

# Computer's random choice
computer_choice = random.choice(choices)

# Print both choices
print(f"You chose: {player_choice}")
print(f"Computer chose: {computer_choice}")

# Determine the winner
result = ""

# Write your if/elif/else logic here
# Draw if same, then check who wins


# Print the result
# print(...)
`,
                tests: [
                    { name: 'player_choice is valid', test: `assert player_choice in ["rock", "paper", "scissors"], f"player_choice must be rock, paper, or scissors, got {player_choice}"` },
                    { name: 'computer_choice is valid', test: `assert computer_choice in ["rock", "paper", "scissors"], f"computer_choice must be rock, paper, or scissors"` },
                    { name: 'result is win, lose, or draw', test: `assert result in ["win", "lose", "draw"], f"result must be 'win', 'lose', or 'draw', got '{result}'"` },
                    { name: 'Logic is correct for draw', test: `
p, c = "rock", "rock"
if p == c: r = "draw"
elif (p=="rock" and c=="scissors") or (p=="scissors" and c=="paper") or (p=="paper" and c=="rock"): r = "win"
else: r = "lose"
assert r == "draw", "Same choice should be a draw"
` },
                    { name: 'Logic is correct for win', test: `
p, c = "rock", "scissors"
if p == c: r = "draw"
elif (p=="rock" and c=="scissors") or (p=="scissors" and c=="paper") or (p=="paper" and c=="rock"): r = "win"
else: r = "lose"
assert r == "win", "Rock vs Scissors should be win"
` }
                ],
                hints: [
                    'Start with: <code>if player_choice == computer_choice: result = "draw"</code>',
                    'Player wins when: rock beats scissors, scissors beats paper, paper beats rock',
                    'Use <code>elif</code>: <code>elif player_choice == "rock" and computer_choice == "scissors": result = "win"</code>',
                    'You can combine win conditions with <code>or</code>, then use <code>else: result = "lose"</code>'
                ]
            },

            // --- LAB 2: Password Generator (Day 5 Project) ---
            {
                id: 'day2-lab2',
                type: 'lab',
                title: 'Project: Password Generator',
                objective: 'Build a password generator that creates random passwords with letters, numbers, and symbols!',
                instructions: `
<h3>The Project (from Udemy Day 5)</h3>
<ol>
    <li>Define lists of characters:
        <ul>
            <li><code>letters</code> - lowercase + uppercase letters</li>
            <li><code>numbers</code> - digits 0-9 as strings</li>
            <li><code>symbols</code> - special characters like !@#$%</li>
        </ul>
    </li>
    <li>Set how many of each: <code>nr_letters = 6</code>, <code>nr_numbers = 3</code>, <code>nr_symbols = 2</code></li>
    <li>Use a <code>for</code> loop + <code>random.choice()</code> to pick random characters and build a <code>password_list</code></li>
    <li>Shuffle the list with <code>random.shuffle()</code> so letters/numbers/symbols are mixed up</li>
    <li>Join the list into a string: <code>password = "".join(password_list)</code></li>
    <li>Print the password</li>
</ol>
`,
                starterCode: `import random

letters = list("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
numbers = list("0123456789")
symbols = list("!@#$%^&*()_+-=")

# How many of each (in PyCharm: use int(input(...)))
nr_letters = 6
nr_numbers = 3
nr_symbols = 2

password_list = []

# Add random letters
# Use a for loop with range(nr_letters) and random.choice(letters)


# Add random numbers
# Use a for loop with range(nr_numbers) and random.choice(numbers)


# Add random symbols
# Use a for loop with range(nr_symbols) and random.choice(symbols)


# Shuffle the list so characters are mixed up
# random.shuffle(password_list)

# Join into a string
# password = "".join(password_list)

# Print it
# print(f"Your password: {password}")
`,
                tests: [
                    { name: 'password_list has correct length', test: `assert len(password_list) == nr_letters + nr_numbers + nr_symbols, f"password_list should have {nr_letters + nr_numbers + nr_symbols} characters, got {len(password_list)}"` },
                    { name: 'password is a string', test: `assert isinstance(password, str), "password should be a string"` },
                    { name: 'password has correct length', test: `assert len(password) == nr_letters + nr_numbers + nr_symbols, f"password should have {nr_letters + nr_numbers + nr_symbols} characters, got {len(password)}"` },
                    { name: 'password contains letters', test: `assert any(c.isalpha() for c in password), "password should contain letters"` },
                    { name: 'password contains digits', test: `assert any(c.isdigit() for c in password), "password should contain digits"` }
                ],
                hints: [
                    'Add letters: <code>for _ in range(nr_letters): password_list.append(random.choice(letters))</code>',
                    'Do the same for numbers and symbols with their respective lists',
                    'Shuffle: <code>random.shuffle(password_list)</code> (modifies the list in place)',
                    'Join: <code>password = "".join(password_list)</code> turns the list into a single string'
                ]
            },

            // --- LAB 3: Hangman (Day 7 Capstone) ---
            {
                id: 'day2-lab3',
                type: 'lab',
                title: 'Project: Hangman (Capstone)',
                objective: 'Build the classic Hangman game - combining lists, loops, functions, and conditionals! This is the Day 7 capstone project.',
                instructions: `
<h3>The Capstone Project (from Udemy Day 7)</h3>
<p>Build a Hangman game step by step:</p>
<ol>
    <li>Write a function <code>choose_word()</code> that picks a random word from <code>word_list</code> and returns it</li>
    <li>Write a function <code>create_display(word, guessed_letters)</code> that returns a list showing guessed letters and <code>"_"</code> for unguessed ones. Example: if word is "apple" and guessed is ["a","p"], return <code>["a", "p", "p", "_", "_"]</code></li>
    <li>Write a function <code>check_game_won(display)</code> that returns <code>True</code> if there are no more underscores</li>
    <li>Write a function <code>play_hangman()</code> that uses the above functions to run the game:
        <ul>
            <li>Pick a word, set <code>lives = 6</code></li>
            <li>Loop: show the display, take a guess, check if correct</li>
            <li>Wrong guess -> lose a life. Repeat guess -> tell the player</li>
            <li>End when lives run out or word is guessed</li>
        </ul>
    </li>
</ol>
<p>The functions are tested individually, so make sure each one works on its own!</p>
`,
                starterCode: `import random

word_list = ["python", "programming", "hangman", "computer", "keyboard",
             "developer", "algorithm", "variable", "function", "boolean"]

def choose_word():
    """Pick and return a random word from word_list."""
    pass  # Replace with your code

def create_display(word, guessed_letters):
    """Return a list with guessed letters shown and '_' for unguessed.
    Example: create_display("apple", ["a", "p"]) -> ["a", "p", "p", "_", "_"]
    """
    pass  # Replace with your code

def check_game_won(display):
    """Return True if there are no '_' in the display list."""
    pass  # Replace with your code

def play_hangman():
    """Run the hangman game."""
    word = choose_word()
    guessed_letters = []
    lives = 6
    game_over = False

    print("Welcome to Hangman!")
    print(f"The word has {len(word)} letters.")

    while not game_over:
        display = create_display(word, guessed_letters)
        print(" ".join(display))
        print(f"Lives: {lives}")

        # Simulate guesses (in PyCharm: guess = input("Guess a letter: ").lower())
        # For testing, we'll just show the setup works
        break  # Remove this break when playing for real in PyCharm

    return word, guessed_letters, lives

# Test the individual functions
test_word = choose_word()
print(f"Random word: {test_word}")

display = create_display("python", ["p", "t", "o"])
print(f"Display: {display}")

print(f"Won? {check_game_won(['p', '_', 't', 'h', 'o', 'n'])}")
print(f"Won? {check_game_won(['p', 'y', 't', 'h', 'o', 'n'])}")
`,
                tests: [
                    { name: 'choose_word returns a word from the list', test: `word = choose_word(); assert word in word_list, f"'{word}' should be from word_list"` },
                    { name: 'create_display shows guessed letters', test: `
d = create_display("apple", ["a", "p"])
assert d == ["a", "p", "p", "_", "_"], f"Expected ['a', 'p', 'p', '_', '_'], got {d}"
` },
                    { name: 'create_display with no guesses shows all blanks', test: `
d = create_display("cat", [])
assert d == ["_", "_", "_"], f"Expected ['_', '_', '_'], got {d}"
` },
                    { name: 'create_display with all letters guessed', test: `
d = create_display("hi", ["h", "i"])
assert d == ["h", "i"], f"Expected ['h', 'i'], got {d}"
` },
                    { name: 'check_game_won returns False when blanks remain', test: `assert check_game_won(["h", "_", "l", "l", "_"]) == False` },
                    { name: 'check_game_won returns True when complete', test: `assert check_game_won(["h", "e", "l", "l", "o"]) == True` }
                ],
                hints: [
                    '<code>choose_word</code>: just <code>return random.choice(word_list)</code>',
                    '<code>create_display</code>: loop through each letter in the word. If the letter is in guessed_letters, add it. Otherwise add "_".',
                    'Build display: <code>display = []; for letter in word: if letter in guessed_letters: display.append(letter) else: display.append("_")</code>',
                    '<code>check_game_won</code>: <code>return "_" not in display</code>'
                ]
            }
        ]
    },

    // =====================================================================
    // DAY 3: ADVANCED PYTHON (Udemy Days 8, 9, 10, 11 & 12)
    // =====================================================================
    {
        id: 'day3',
        title: 'Day 3: Advanced Python',
        description: 'Master function parameters, dictionaries, nesting, return values, scope, and build real projects like Caesar Cipher and Blackjack.',
        items: [
            // --- LESSON 1: Function Parameters & Arguments ---
            {
                id: 'day3-lesson1',
                type: 'lesson',
                title: 'Function Parameters & Arguments',
                content: `
<h1>Function Parameters & Arguments</h1>
<p>Functions become truly powerful when they accept inputs (parameters) and produce outputs (return values). Let's master how to pass data into functions.</p>

<h2>Parameters vs Arguments</h2>
<p>A <strong>parameter</strong> is the variable in the function definition. An <strong>argument</strong> is the value you pass when calling.</p>

<div class="code-block" data-example="d3l1_params">
<code>def greet(name, greeting):      # name and greeting are PARAMETERS
    print(f"{greeting}, {name}!")

greet("Alice", "Hello")          # "Alice" and "Hello" are ARGUMENTS
greet("Bob", "Hey")
greet("Carol", "Good morning")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Positional vs Keyword Arguments</h2>
<p>You can pass arguments by position or by name:</p>

<div class="code-block" data-example="d3l1_kwargs">
<code>def describe_pet(animal, name):
    print(f"I have a {animal} named {name}")

# Positional - order matters!
describe_pet("dog", "Rex")

# Keyword - order doesn't matter!
describe_pet(name="Whiskers", animal="cat")

# Mix: positional first, then keyword
describe_pet("hamster", name="Fuzzy")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Default Parameter Values</h2>
<p>Give parameters default values to make them optional:</p>

<div class="code-block" data-example="d3l1_defaults">
<code>def make_coffee(size="medium", sugar=1, milk=True):
    order = f"{size} coffee"
    order += f", {sugar} sugar" if sugar else ", no sugar"
    order += ", with milk" if milk else ", black"
    print(order)

make_coffee()                           # All defaults
make_coffee("large")                    # Override size only
make_coffee("small", 0, False)          # Override all
make_coffee(sugar=3)                    # Just change sugar
make_coffee(size="large", milk=False)   # Named overrides</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Functions Calling Functions</h2>
<p>Functions can call other functions - this is how you build complex programs from simple pieces:</p>

<div class="code-block" data-example="d3l1_compose">
<code>def is_leap_year(year):
    if year % 400 == 0:
        return True
    if year % 100 == 0:
        return False
    if year % 4 == 0:
        return True
    return False

def days_in_month(year, month):
    days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if month == 2 and is_leap_year(year):
        return 29
    return days[month - 1]

# Test it
print(f"Feb 2024: {days_in_month(2024, 2)} days")
print(f"Feb 2023: {days_in_month(2023, 2)} days")
print(f"Jan 2024: {days_in_month(2024, 1)} days")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>The Caesar Cipher Concept</h2>
<p>The Caesar Cipher shifts each letter by a fixed number. Here's how shifting works:</p>

<div class="code-block" data-example="d3l1_caesar">
<code>alphabet = "abcdefghijklmnopqrstuvwxyz"

def shift_letter(letter, shift):
    if letter not in alphabet:
        return letter
    position = alphabet.index(letter)
    new_position = (position + shift) % 26
    return alphabet[new_position]

# Shift 'a' by 3 -> 'd'
print(shift_letter("a", 3))  # d
print(shift_letter("x", 3))  # a (wraps around!)
print(shift_letter("z", 1))  # a

# Try a word
word = "hello"
shifted = ""
for char in word:
    shifted += shift_letter(char, 5)
print(f"'{word}' shifted by 5 = '{shifted}'")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-tip">
<strong>Key Takeaway</strong>
Positional arguments must be in order. Keyword arguments can be in any order and make code more readable. Default values make parameters optional. Functions can call other functions to build complex behavior from simple parts.
</div>
`
            },

            // --- LESSON 2: Dictionaries & Nesting ---
            {
                id: 'day3-lesson2',
                type: 'lesson',
                title: 'Dictionaries & Nesting',
                content: `
<h1>Dictionaries & Nesting</h1>
<p>Dictionaries store <strong>key-value pairs</strong>. Think of them like a real dictionary: you look up a word (key) to find its definition (value).</p>

<h2>Creating Dictionaries</h2>
<div class="code-block" data-example="d3l2_create">
<code># Key: Value pairs inside curly braces
student = {
    "name": "Alice",
    "age": 20,
    "major": "Computer Science",
    "gpa": 3.8
}

print(student)
print(student["name"])       # Alice
print(student["gpa"])        # 3.8</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Adding, Updating & Removing</h2>
<div class="code-block" data-example="d3l2_modify">
<code>student = {"name": "Alice", "age": 20}

# Add a new key-value pair
student["email"] = "alice@email.com"
print(student)

# Update an existing value
student["age"] = 21
print(f"Updated age: {student['age']}")

# Remove a key
del student["email"]
print(student)

# Create an empty dict and build it up
scores = {}
scores["Alice"] = 95
scores["Bob"] = 87
scores["Carol"] = 92
print(scores)</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Looping Through Dictionaries</h2>
<div class="code-block" data-example="d3l2_loop">
<code>scores = {"Alice": 95, "Bob": 87, "Carol": 92, "Dave": 78}

# Loop through keys
for name in scores:
    print(f"{name}: {scores[name]}")

print("---")

# Loop through key-value pairs (preferred)
for name, score in scores.items():
    if score >= 90:
        print(f"{name}: {score}  Honor Roll")
    else:
        print(f"{name}: {score}")

# Get just keys or just values
print(f"Students: {list(scores.keys())}")
print(f"Scores: {list(scores.values())}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Safe Access with <code>.get()</code></h2>
<div class="code-block" data-example="d3l2_get">
<code>student = {"name": "Alice", "age": 20}

# Direct access crashes if key doesn't exist
# print(student["phone"])  # KeyError!

# .get() returns None (or a default) instead of crashing
print(student.get("phone"))            # None
print(student.get("phone", "N/A"))     # N/A
print(student.get("name", "Unknown"))  # Alice (key exists)</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Nesting - Dictionaries in Lists</h2>
<p>Store a list of dictionaries for structured data (like a database of records):</p>

<div class="code-block" data-example="d3l2_dictlist">
<code>travel_log = [
    {
        "country": "France",
        "cities_visited": ["Paris", "Lyon", "Nice"],
        "visits": 3
    },
    {
        "country": "Japan",
        "cities_visited": ["Tokyo", "Osaka"],
        "visits": 1
    }
]

# Access nested data
print(travel_log[0]["country"])              # France
print(travel_log[0]["cities_visited"][0])     # Paris
print(travel_log[1]["visits"])               # 1

# Loop through
for entry in travel_log:
    print(f"{entry['country']}: {', '.join(entry['cities_visited'])}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Nesting - Lists & Dicts in Dicts</h2>
<div class="code-block" data-example="d3l2_deepnest">
<code># Dictionary inside a dictionary
family = {
    "parents": {
        "mom": "Sarah",
        "dad": "James"
    },
    "children": ["Alice", "Bob"],
    "pets": {
        "dog": "Rex",
        "cat": "Whiskers"
    }
}

print(family["parents"]["mom"])     # Sarah
print(family["children"][0])        # Alice
print(family["pets"]["dog"])        # Rex

# Modify nested data
family["children"].append("Carol")
print(family["children"])  # ['Alice', 'Bob', 'Carol']</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-tip">
<strong>Key Takeaway</strong>
Dictionaries map keys to values. Use <code>.get()</code> for safe access, <code>.items()</code> for looping, and nesting for complex data structures. Think of dicts as the Python equivalent of JSON objects.
</div>
`
            },

            // --- LESSON 3: Return Values, Scope & Constants ---
            {
                id: 'day3-lesson3',
                type: 'lesson',
                title: 'Return Values, Scope & Constants',
                content: `
<h1>Return Values, Scope & Constants</h1>
<p>Functions become truly powerful when they <em>return</em> data. Understanding scope helps you avoid confusing bugs. Constants keep your code clean.</p>

<h2>The <code>return</code> Statement</h2>
<p><code>return</code> sends a value back from the function. This is more useful than printing because you can use the result in other code:</p>

<div class="code-block" data-example="d3l3_return">
<code>def add(a, b):
    return a + b

def is_even(number):
    return number % 2 == 0

# Use returned values
result = add(10, 20)
print(f"Sum: {result}")

print(f"Is 7 even? {is_even(7)}")
print(f"Is 8 even? {is_even(8)}")

# Chain function calls
total = add(add(1, 2), add(3, 4))
print(f"(1+2) + (3+4) = {total}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Return vs Print</h2>
<div class="code-block" data-example="d3l3_retvsprint">
<code># This function PRINTS - the result can't be reused
def add_and_print(a, b):
    print(a + b)

# This function RETURNS - the result can be reused
def add_and_return(a, b):
    return a + b

# You can't do math with a print function
x = add_and_print(3, 5)     # Prints 8
print(f"x = {x}")           # x = None (print doesn't return!)

# But you CAN with a return function
y = add_and_return(3, 5)    # Returns 8
print(f"y = {y}")           # y = 8
print(f"y * 2 = {y * 2}")   # y * 2 = 16</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Early Return</h2>
<p><code>return</code> immediately exits the function. Code after it won't run:</p>

<div class="code-block" data-example="d3l3_early">
<code>def check_age(age):
    if age < 0:
        return "Invalid age"
    if age < 13:
        return "Child"
    if age < 18:
        return "Teenager"
    return "Adult"

print(check_age(8))    # Child
print(check_age(15))   # Teenager
print(check_age(25))   # Adult
print(check_age(-1))   # Invalid age</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Multiple Return Values</h2>
<div class="code-block" data-example="d3l3_multiret">
<code>def analyze_numbers(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    largest = max(numbers)
    smallest = min(numbers)
    return total, average, largest, smallest

nums = [10, 20, 30, 40, 50]
total, avg, big, small = analyze_numbers(nums)
print(f"Total: {total}, Average: {avg}")
print(f"Largest: {big}, Smallest: {small}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Docstrings</h2>
<p>Document what your functions do with a triple-quoted string right after <code>def</code>:</p>

<div class="code-block" data-example="d3l3_docstring">
<code>def calculate_bmi(weight_kg, height_m):
    """Calculate Body Mass Index.

    Args:
        weight_kg: Weight in kilograms
        height_m: Height in meters

    Returns:
        BMI as a float, rounded to 1 decimal place
    """
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 1)

result = calculate_bmi(70, 1.75)
print(f"BMI: {result}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Variable Scope - Local vs Global</h2>
<p>Where you create a variable determines where it's accessible:</p>

<div class="code-block" data-example="d3l3_scope">
<code># Global variable - accessible everywhere
player_name = "Alice"

def print_score(score):
    # Local variable - only exists inside this function
    message = f"{player_name} scored {score}"
    print(message)

print_score(100)
print(player_name)      # Works - it's global

# print(message)  # ERROR! 'message' is local to print_score
# print(score)    # ERROR! 'score' is local to print_score</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<h2>Scope Rules in Detail</h2>
<div class="code-block" data-example="d3l3_scoperules">
<code>enemies = 1  # Global

def increase_enemies():
    # This creates a NEW local variable, doesn't change the global!
    enemies = 2
    print(f"Inside function: enemies = {enemies}")

increase_enemies()
print(f"Outside function: enemies = {enemies}")  # Still 1!

# To modify a global variable inside a function, use the 'global' keyword
lives = 3

def lose_life():
    global lives
    lives -= 1
    print(f"Lost a life! Lives remaining: {lives}")

lose_life()
print(f"Global lives: {lives}")  # Now 2</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-warning">
<strong>Avoid <code>global</code> When Possible!</strong>
Using <code>global</code> makes code harder to debug. It's better to pass values as parameters and return results. The <code>global</code> keyword exists, but use it sparingly.
</div>

<h2>Constants</h2>
<p>Constants are variables that should never change. Python uses <code>ALL_CAPS</code> naming as a convention:</p>

<div class="code-block" data-example="d3l3_constants">
<code>PI = 3.14159
MAX_LIVES = 6
WINNING_SCORE = 21
DIRECTIONS = ["north", "south", "east", "west"]

def circle_area(radius):
    return PI * radius ** 2

print(f"Area of circle (r=5): {circle_area(5):.2f}")
print(f"Max lives in game: {MAX_LIVES}")
print(f"Blackjack target: {WINNING_SCORE}")</code>
<button class="try-btn" onclick="app.openExample(this)">Try it</button>
</div>

<div class="callout callout-tip">
<strong>Key Takeaway</strong>
Always prefer <code>return</code> over <code>print</code> in functions - it makes them composable. Variables inside functions are local. Use ALL_CAPS for constants. Avoid <code>global</code> when you can use parameters and returns instead.
</div>
`
            },

            // --- LAB 1: Caesar Cipher (Day 8 Project) ---
            {
                id: 'day3-lab1',
                type: 'lab',
                title: 'Project: Caesar Cipher',
                objective: 'Build a Caesar Cipher program that can encrypt and decrypt messages by shifting letters!',
                instructions: `
<h3>The Project (from Udemy Day 8)</h3>
<ol>
    <li>Create the <code>alphabet</code> string: all 26 lowercase letters</li>
    <li>Write a function <code>caesar(text, shift, direction)</code> that:
        <ul>
            <li>Takes a text string, a shift amount, and direction (<code>"encode"</code> or <code>"decode"</code>)</li>
            <li>If decoding, reverse the shift (negate it)</li>
            <li>Loops through each character in the text</li>
            <li>If the character is a letter, shift it using the modulo trick: <code>(position + shift) % 26</code></li>
            <li>If the character is NOT a letter (space, number, punctuation), keep it as-is</li>
            <li>Returns the new string</li>
        </ul>
    </li>
    <li>Test encoding "hello" with shift 5 -> "mjqqt"</li>
    <li>Test decoding "mjqqt" with shift 5 -> "hello"</li>
</ol>
`,
                starterCode: `alphabet = "abcdefghijklmnopqrstuvwxyz"

def caesar(text, shift, direction):
    """Encrypt or decrypt text using the Caesar Cipher.

    Args:
        text: The message to encode/decode
        shift: How many positions to shift each letter
        direction: "encode" to encrypt, "decode" to decrypt

    Returns:
        The encoded or decoded string
    """
    result = ""

    # If decoding, reverse the shift
    # if direction == "decode":
    #     shift *= -1

    # Loop through each character
    # for char in text.lower():
    #     if char in alphabet:
    #         position = alphabet.index(char)
    #         new_position = (position + shift) % 26
    #         result += alphabet[new_position]
    #     else:
    #         result += char  # Keep non-letters as-is

    return result

# Test
encoded = caesar("hello", 5, "encode")
print(f"Encoded: {encoded}")  # Should be: mjqqt

decoded = caesar("mjqqt", 5, "decode")
print(f"Decoded: {decoded}")  # Should be: hello

# Test with spaces and punctuation
encoded2 = caesar("hello world!", 3, "encode")
print(f"Encoded: {encoded2}")  # khoor zruog!

decoded2 = caesar(encoded2, 3, "decode")
print(f"Decoded: {decoded2}")  # hello world!
`,
                tests: [
                    { name: 'Encoding "hello" with shift 5', test: `assert caesar("hello", 5, "encode") == "mjqqt", f"Expected 'mjqqt', got '{caesar('hello', 5, 'encode')}'"` },
                    { name: 'Decoding "mjqqt" with shift 5', test: `assert caesar("mjqqt", 5, "decode") == "hello", f"Expected 'hello', got '{caesar('mjqqt', 5, 'decode')}'"` },
                    { name: 'Handles spaces and punctuation', test: `result = caesar("hello world!", 3, "encode"); assert " " in result and "!" in result, "Should keep spaces and punctuation"` },
                    { name: 'Wraps around the alphabet', test: `assert caesar("xyz", 3, "encode") == "abc", f"Expected 'abc', got '{caesar('xyz', 3, 'encode')}'"` },
                    { name: 'Encode then decode returns original', test: `
original = "test message"
encoded = caesar(original, 7, "encode")
decoded = caesar(encoded, 7, "decode")
assert decoded == original, f"Expected '{original}', got '{decoded}'"
` }
                ],
                hints: [
                    'Start by reversing the shift for decode: <code>if direction == "decode": shift *= -1</code>',
                    'Loop through characters: <code>for char in text.lower():</code>',
                    'For letters: find position with <code>alphabet.index(char)</code>, shift with <code>(position + shift) % 26</code>',
                    'For non-letters, just append them unchanged: <code>result += char</code>'
                ]
            },

            // --- LAB 2: Blind Auction (Day 9 Project) ---
            {
                id: 'day3-lab2',
                type: 'lab',
                title: 'Project: Blind Auction',
                objective: 'Build a blind auction program using dictionaries - bidders submit bids without seeing others\' bids, then the highest bidder wins!',
                instructions: `
<h3>The Project (from Udemy Day 9)</h3>
<ol>
    <li>Create a dictionary called <code>bids</code> with at least 3 bidders (name -> bid amount)</li>
    <li>Write a function <code>find_highest_bidder(bids_dict)</code> that:
        <ul>
            <li>Loops through all the bids</li>
            <li>Finds the person with the highest bid</li>
            <li>Returns a dictionary: <code>{"name": winner_name, "bid": highest_bid}</code></li>
        </ul>
    </li>
    <li>Call the function and print: <code>The winner is [name] with a bid of $[amount]</code></li>
</ol>
<p><strong>PyCharm Tip:</strong> In PyCharm, you'd use a <code>while</code> loop to keep asking for bidders until no one else wants to bid.</p>
`,
                starterCode: `# Blind Auction - Day 9 Project

# Simulated bids (in PyCharm, you'd collect these with input() in a loop)
bids = {
    "Alice": 120,
    "Bob": 250,
    "Carol": 175,
    "Dave": 300,
    "Eve": 225
}

def find_highest_bidder(bids_dict):
    """Find and return the highest bidder.

    Args:
        bids_dict: Dictionary of {name: bid_amount}

    Returns:
        Dictionary with "name" and "bid" of the winner
    """
    pass  # Replace with your code

# Find the winner
winner = find_highest_bidder(bids)
# print("The winner is " + winner["name"] + " with a bid of $" + str(winner["bid"]))
`,
                tests: [
                    { name: 'find_highest_bidder returns a dictionary', test: `result = find_highest_bidder(bids); assert isinstance(result, dict), "Should return a dictionary"` },
                    { name: 'Result has name and bid keys', test: `result = find_highest_bidder(bids); assert "name" in result and "bid" in result, "Should have 'name' and 'bid' keys"` },
                    { name: 'Finds the correct winner', test: `
result = find_highest_bidder({"A": 10, "B": 50, "C": 30})
assert result["name"] == "B" and result["bid"] == 50, f"Expected B with 50, got {result}"
` },
                    { name: 'Works with the given bids (Dave wins)', test: `
result = find_highest_bidder(bids)
assert result["name"] == "Dave", f"Expected Dave, got {result['name']}"
assert result["bid"] == 300, f"Expected 300, got {result['bid']}"
` }
                ],
                hints: [
                    'Start with: <code>highest_bid = 0</code> and <code>winner = ""</code>',
                    'Loop: <code>for name, bid in bids_dict.items():</code>',
                    'Inside the loop: <code>if bid > highest_bid: highest_bid = bid; winner = name</code>',
                    'Return: <code>return {"name": winner, "bid": highest_bid}</code>'
                ]
            },

            // --- LAB 3: Calculator (Day 10 Project) ---
            {
                id: 'day3-lab3',
                type: 'lab',
                title: 'Project: Calculator',
                objective: 'Build a calculator that performs operations and can continue calculating with the previous result!',
                instructions: `
<h3>The Project (from Udemy Day 10)</h3>
<ol>
    <li>Write four functions: <code>add(n1, n2)</code>, <code>subtract(n1, n2)</code>, <code>multiply(n1, n2)</code>, <code>divide(n1, n2)</code></li>
    <li>Each should <strong>return</strong> the result (not print it)</li>
    <li><code>divide</code> should return <code>0</code> if n2 is 0 (avoid division error)</li>
    <li>Create a dictionary called <code>operations</code> that maps symbols to functions:
        <code>{"+": add, "-": subtract, "*": multiply, "/": divide}</code></li>
    <li>Write a function <code>calculate(n1, operator, n2)</code> that looks up the operator in the dictionary, calls the function, and returns the result</li>
    <li>Test all operations and print the results</li>
</ol>
<p><strong>Cool concept:</strong> You can store functions in a dictionary and call them dynamically!</p>
`,
                starterCode: `# Calculator - Day 10 Project

def add(n1, n2):
    """Return n1 + n2"""
    pass

def subtract(n1, n2):
    """Return n1 - n2"""
    pass

def multiply(n1, n2):
    """Return n1 * n2"""
    pass

def divide(n1, n2):
    """Return n1 / n2, or 0 if n2 is 0"""
    pass

# Dictionary mapping operators to functions
operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
}

def calculate(n1, operator, n2):
    """Look up the operator function and return the result."""
    pass

# Test all operations
# print(f"10 + 5 = {calculate(10, '+', 5)}")
# print(f"10 - 5 = {calculate(10, '-', 5)}")
# print(f"10 * 5 = {calculate(10, '*', 5)}")
# print(f"10 / 5 = {calculate(10, '/', 5)}")
# print(f"10 / 0 = {calculate(10, '/', 0)}")

# Continuous calculation example
# result = calculate(10, "+", 5)       # 15
# result = calculate(result, "*", 2)    # 30
# result = calculate(result, "-", 6)    # 24
# print(f"Final result: {result}")
`,
                tests: [
                    { name: 'add(10, 5) returns 15', test: `assert add(10, 5) == 15, f"Expected 15, got {add(10, 5)}"` },
                    { name: 'subtract(10, 5) returns 5', test: `assert subtract(10, 5) == 5, f"Expected 5, got {subtract(10, 5)}"` },
                    { name: 'multiply(10, 5) returns 50', test: `assert multiply(10, 5) == 50, f"Expected 50, got {multiply(10, 5)}"` },
                    { name: 'divide(10, 5) returns 2.0', test: `assert divide(10, 5) == 2.0, f"Expected 2.0, got {divide(10, 5)}"` },
                    { name: 'divide(10, 0) returns 0 (safe)', test: `assert divide(10, 0) == 0, f"divide by zero should return 0, got {divide(10, 0)}"` },
                    { name: 'operations dict maps symbols to functions', test: `assert operations["+"] == add and operations["-"] == subtract, "operations dict should map '+' to add, '-' to subtract, etc."` },
                    { name: 'calculate uses the operations dict', test: `assert calculate(10, "+", 5) == 15, f"calculate(10, '+', 5) should be 15, got {calculate(10, '+', 5)}"` }
                ],
                hints: [
                    'Each function is simple: <code>def add(n1, n2): return n1 + n2</code>',
                    'For divide: <code>if n2 == 0: return 0</code> then <code>return n1 / n2</code>',
                    'The operations dict stores functions as values: <code>{"+": add, "-": subtract, ...}</code>',
                    'calculate: <code>func = operations[operator]; return func(n1, n2)</code>'
                ]
            },

            // --- LAB 4: Number Guessing Game (Day 12 Project) ---
            {
                id: 'day3-lab4',
                type: 'lab',
                title: 'Project: Number Guessing Game',
                objective: 'Build a number guessing game with difficulty levels using scope, constants, and all the skills you\'ve learned!',
                instructions: `
<h3>The Project (from Udemy Day 12)</h3>
<ol>
    <li>Define constants: <code>EASY_ATTEMPTS = 10</code>, <code>HARD_ATTEMPTS = 5</code></li>
    <li>Write <code>set_difficulty(level)</code> that returns the right number of attempts based on the level ("easy" or "hard")</li>
    <li>Write <code>check_guess(guess, answer)</code> that:
        <ul>
            <li>Returns <code>"correct"</code> if guess equals answer</li>
            <li>Returns <code>"too_high"</code> if guess is higher</li>
            <li>Returns <code>"too_low"</code> if guess is lower</li>
        </ul>
    </li>
    <li>Write <code>play_game(answer, attempts)</code> that simulates a series of guesses:
        <ul>
            <li>Takes the answer and number of attempts</li>
            <li>Uses a list of <code>guesses</code> (simulated)</li>
            <li>Returns <code>True</code> if the player guessed correctly within the attempts, <code>False</code> otherwise</li>
        </ul>
    </li>
</ol>
`,
                starterCode: `import random

# Constants
EASY_ATTEMPTS = 10
HARD_ATTEMPTS = 5

def set_difficulty(level):
    """Return the number of attempts based on difficulty level.

    Args:
        level: "easy" or "hard"

    Returns:
        Number of attempts (int)
    """
    pass  # Replace with your code

def check_guess(guess, answer):
    """Compare guess to answer.

    Returns:
        "correct", "too_high", or "too_low"
    """
    pass  # Replace with your code

def play_game(answer, attempts, guesses):
    """Play the guessing game with a list of simulated guesses.

    Args:
        answer: The correct number
        attempts: Max attempts allowed
        guesses: List of guesses to try

    Returns:
        True if correct guess was made within attempts, False otherwise
    """
    pass  # Replace with your code

# Test set_difficulty
print(f"Easy mode: {set_difficulty('easy')} attempts")
print(f"Hard mode: {set_difficulty('hard')} attempts")

# Test check_guess
print(f"Guess 50 vs answer 75: {check_guess(50, 75)}")
print(f"Guess 90 vs answer 75: {check_guess(90, 75)}")
print(f"Guess 75 vs answer 75: {check_guess(75, 75)}")

# Test play_game with simulated guesses
won = play_game(75, 5, [50, 80, 70, 75])
print(f"Won the game? {won}")

lost = play_game(75, 3, [50, 80, 70])
print(f"Won the game? {lost}")
`,
                tests: [
                    { name: 'set_difficulty("easy") returns 10', test: `assert set_difficulty("easy") == EASY_ATTEMPTS, f"Expected {EASY_ATTEMPTS}, got {set_difficulty('easy')}"` },
                    { name: 'set_difficulty("hard") returns 5', test: `assert set_difficulty("hard") == HARD_ATTEMPTS, f"Expected {HARD_ATTEMPTS}, got {set_difficulty('hard')}"` },
                    { name: 'check_guess returns "too_low"', test: `assert check_guess(50, 75) == "too_low", f"Expected 'too_low', got '{check_guess(50, 75)}'"` },
                    { name: 'check_guess returns "too_high"', test: `assert check_guess(90, 75) == "too_high", f"Expected 'too_high', got '{check_guess(90, 75)}'"` },
                    { name: 'check_guess returns "correct"', test: `assert check_guess(75, 75) == "correct", f"Expected 'correct', got '{check_guess(75, 75)}'"` },
                    { name: 'play_game returns True when correct guess is within attempts', test: `assert play_game(75, 5, [50, 80, 70, 75]) == True, "Should win when guessing correctly within attempt limit"` },
                    { name: 'play_game returns False when running out of attempts', test: `assert play_game(75, 2, [50, 80, 70, 75]) == False, "Should lose when attempts run out before correct guess"` }
                ],
                hints: [
                    '<code>set_difficulty</code>: <code>if level == "easy": return EASY_ATTEMPTS</code> else return HARD_ATTEMPTS',
                    '<code>check_guess</code>: use if/elif/else comparing guess to answer',
                    '<code>play_game</code>: loop through guesses with a counter. If counter exceeds attempts, return False. If guess is correct, return True.',
                    'Loop: <code>for i, guess in enumerate(guesses): if i >= attempts: return False; if check_guess(guess, answer) == "correct": return True</code>'
                ]
            },

            // --- LAB 5: Blackjack (Day 11 Capstone) ---
            {
                id: 'day3-lab5',
                type: 'lab',
                title: 'Project: Blackjack (Capstone)',
                objective: 'Build a simplified Blackjack card game - the ultimate capstone combining everything from Days 1-12!',
                instructions: `
<h3>The Capstone Project (from Udemy Day 11)</h3>
<p>Build the core functions for a Blackjack game:</p>
<ol>
    <li><code>deal_card()</code> - Returns a random card value from a deck. Cards 2-10 are face value, J/Q/K = 10, Ace = 11</li>
    <li><code>calculate_score(cards)</code> - Takes a list of card values and returns the total. Special rules:
        <ul>
            <li>If the total is over 21 and there's an 11 (Ace), change the 11 to a 1</li>
            <li>If the hand is [11, 10] or [10, 11] (natural blackjack), return <strong>0</strong> (special score meaning instant win)</li>
        </ul>
    </li>
    <li><code>compare(player_score, computer_score)</code> - Returns the result string:
        <ul>
            <li>Player blackjack (0) -> <code>"Blackjack! You win!"</code></li>
            <li>Computer blackjack (0) -> <code>"Computer has Blackjack. You lose!"</code></li>
            <li>Player over 21 -> <code>"You went over. You lose!"</code></li>
            <li>Computer over 21 -> <code>"Computer went over. You win!"</code></li>
            <li>Player score higher -> <code>"You win!"</code></li>
            <li>Equal -> <code>"It's a draw!"</code></li>
            <li>Otherwise -> <code>"You lose!"</code></li>
        </ul>
    </li>
</ol>
<p>Build and test each function individually. The game logic ties them together!</p>
`,
                starterCode: `import random

def deal_card():
    """Return a random card value.
    Cards: 2-10 face value, J/Q/K = 10, Ace = 11
    """
    cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]
    return random.choice(cards)

def calculate_score(cards):
    """Calculate the score of a hand.
    - Blackjack (Ace + 10) returns 0 (special value)
    - If over 21 and there's an 11, change 11 to 1
    """
    pass  # Replace with your code

def compare(player_score, computer_score):
    """Compare scores and return result message."""
    pass  # Replace with your code

# Test deal_card
card = deal_card()
print(f"Dealt: {card}")

# Test calculate_score
print(f"Score of [10, 5, 6]: {calculate_score([10, 5, 6])}")     # 21
print(f"Score of [11, 10]: {calculate_score([11, 10])}")          # 0 (Blackjack!)
print(f"Score of [11, 5, 7]: {calculate_score([11, 5, 7])}")     # 23 -> 13 (Ace becomes 1)
print(f"Score of [10, 8, 5]: {calculate_score([10, 8, 5])}")     # 23 (bust, no ace)

# Test compare
print(f"Player 21 vs Computer 19: {compare(21, 19)}")
print(f"Player 0 vs Computer 19: {compare(0, 19)}")   # Blackjack!
print(f"Player 25 vs Computer 19: {compare(25, 19)}")  # Bust
print(f"Player 19 vs Computer 19: {compare(19, 19)}")  # Draw
`,
                tests: [
                    { name: 'deal_card returns value between 2 and 11', test: `card = deal_card(); assert 2 <= card <= 11, f"Card should be 2-11, got {card}"` },
                    { name: 'calculate_score returns correct total', test: `assert calculate_score([10, 5, 6]) == 21, f"Expected 21, got {calculate_score([10, 5, 6])}"` },
                    { name: 'Blackjack (Ace + 10) returns 0', test: `assert calculate_score([11, 10]) == 0, f"Blackjack should return 0, got {calculate_score([11, 10])}"` },
                    { name: 'Ace converts from 11 to 1 when over 21', test: `
score = calculate_score([11, 5, 7])
assert score == 13, f"[11, 5, 7] should be 13 (ace->1), got {score}"
` },
                    { name: 'No ace conversion when not over 21', test: `assert calculate_score([11, 5]) == 16, f"[11, 5] should be 16, got {calculate_score([11, 5])}"` },
                    { name: 'compare: player wins', test: `assert "win" in compare(20, 18).lower() and "lose" not in compare(20, 18).lower(), "Player 20 vs 18 should win"` },
                    { name: 'compare: player blackjack', test: `assert "blackjack" in compare(0, 18).lower() or "win" in compare(0, 18).lower(), "Player blackjack (0) should win"` },
                    { name: 'compare: player busts', test: `assert "lose" in compare(25, 18).lower(), "Player 25 (bust) should lose"` },
                    { name: 'compare: draw', test: `assert "draw" in compare(19, 19).lower(), "Equal scores should be a draw"` },
                    { name: 'compare: computer busts', test: `assert "win" in compare(18, 25).lower(), "Computer bust (25) means player wins"` }
                ],
                hints: [
                    '<code>calculate_score</code>: first check for blackjack: <code>if len(cards) == 2 and 11 in cards and 10 in cards: return 0</code>',
                    'Then calculate total: <code>total = sum(cards)</code>. If <code>total > 21 and 11 in cards</code>, subtract 10 (changing ace from 11 to 1)',
                    '<code>compare</code>: check for blackjack (0) first, then check for busts (>21), then compare scores',
                    'Structure: <code>if player_score == 0: return "Blackjack! You win!"</code> then <code>elif computer_score == 0: ...</code> and so on'
                ]
            }
        ]
    }
];
