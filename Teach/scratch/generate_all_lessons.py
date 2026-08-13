"""
Generates complete, clean HTML lesson files for lessons 1-14.
Each lesson includes:
- Live Interactive Playground links (http://localhost:5239)
- Detailed explanations of how the C# example code works when executed.
- Shuffled 5-option interactive quizzes.
"""
import os, random, re

LESSONS_DIR = r"c:\Users\Laptop-JAB\Desktop\Learn\Teach\lessons"
CSS = "../assets/style.css"

def h(text):
    """Highlight key architectural terms in a string."""
    terms = [
        "Interface Segregation Principle","Dependency Inversion Principle",
        "Single Responsibility Principle","Liskov Substitution Principle",
        "Open/Closed Principle","Dependency Injection","Clean Architecture",
        "Repository Pattern","Constructor Injection","Template Method",
        "Test-Driven Development","Unit Testing","Abstract Class",
        "Loose Coupling","Polymorphism","Encapsulation","Inheritance",
        "Middleware","Interface","abstract","virtual","override",
        "Singleton","Transient","Scoped","CORS","TDD","SRP","OCP","LSP","ISP","DIP",
    ]
    # Highlight terms outside HTML tags
    for term in sorted(terms, key=len, reverse=True):
        text = re.sub(rf'(?<![>a-zA-Z])({re.escape(term)})(?![<a-zA-Z])', r'<mark>\1</mark>', text)
    return text

def quiz(question, correct, distractors, explain):
    """Build a 5-option quiz with correct answer at a random position."""
    options = [(correct, True)] + [(d, False) for d in distractors[:4]]
    random.shuffle(options)
    correct_idx = next(i for i,(t,c) in enumerate(options) if c)

    btns = "\n".join(
        f'            <button class="quiz-btn" onclick="handleQuiz(this,{i})">{t}</button>'
        for i,(t,_) in enumerate(options)
    )

    js = f"""        var CORRECT_IDX = {correct_idx};
        var EXPLAIN = "{explain.replace('"','&quot;')}";
        function handleQuiz(btn, idx) {{
            var btns = document.querySelectorAll('.quiz-btn');
            btns.forEach(function(b){{ b.disabled=true; }});
            var fb = document.getElementById('quiz-feedback');
            fb.style.display='block';
            if(idx===CORRECT_IDX){{
                btn.classList.add('correct');
                fb.className='quiz-feedback alert-success';
                fb.innerHTML='<strong>&#10003; Correct!</strong> '+EXPLAIN;
            }}else{{
                btn.classList.add('incorrect');
                btns[CORRECT_IDX].classList.add('correct');
                fb.className='quiz-feedback alert-danger';
                fb.innerHTML='<strong>&#10007; Incorrect.</strong> The correct answer is highlighted. '+EXPLAIN;
            }}
        }}"""

    html = f"""    <div class="quiz-container">
        <div class="quiz-question">{question}</div>
        <div class="quiz-options">
{btns}
        </div>
        <div id="quiz-feedback" class="quiz-feedback"></div>
    </div>"""

    return html, js

base_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="stylesheet" href="../assets/style.css">
    <style>
        .code-editor-container{{background:#0b0f19;border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1.5rem;margin-bottom:1.5rem;}}
        .code-textarea{{width:100%;height:280px;background:#131d31;color:#f1f5f9;font-family:var(--font-mono);font-size:.95rem;border:1px solid var(--border-color);border-radius:var(--radius-sm);padding:1rem;resize:vertical;outline:none;}}
        .code-textarea:focus{{border-color:var(--primary-color);}}
        .test-result-box{{margin-top:1rem;padding:1rem;border-radius:var(--radius-sm);font-family:var(--font-mono);font-size:.9rem;display:none;}}
        .why-card{{background:#1e293b;border-left:4px solid #3b82f6;padding:1.25rem;margin-bottom:1.5rem;border-radius:0 var(--radius-md) var(--radius-md) 0;}}
        .why-title{{font-weight:700;color:#60a5fa;margin-bottom:.5rem;font-size:1.05rem;}}
        .run-card{{background:#0f172a;border-left:4px solid #10b981;padding:1.25rem;margin-bottom:1.5rem;border-radius:0 var(--radius-md) var(--radius-md) 0;}}
        .run-title{{font-weight:700;color:#34d399;margin-bottom:.5rem;font-size:1.05rem;}}
        .capability-grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin-bottom:1.5rem;}}
        .capability-item{{background:#162032;border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1.25rem;}}
        .capability-title{{font-weight:700;color:#818cf8;margin-bottom:.5rem;}}
        .tdd-step{{display:flex;align-items:center;gap:1rem;background:#1e293b;padding:1rem;border-radius:var(--radius-md);border:1px solid var(--border-color);margin-bottom:.75rem;}}
        .badge{{font-weight:700;padding:.2rem .7rem;border-radius:var(--radius-sm);font-size:.85rem;text-transform:uppercase;white-space:nowrap;}}
        .badge-red{{background:#7f1d1d;color:#fecaca;border:1px solid #991b1b;}}
        .badge-green{{background:#064e3b;color:#d1fae5;border:1px solid #065f46;}}
        .badge-blue{{background:#1e3a8a;color:#bfdbfe;border:1px solid #1d4ed8;}}
        .lifetime-table{{width:100%;border-collapse:collapse;margin-bottom:1.5rem;background:#1e293b;border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--border-color);}}
        .lifetime-table th,.lifetime-table td{{padding:1rem;text-align:left;border-bottom:1px solid var(--border-color);}}
        .lifetime-table th{{background:#0f172a;color:#818cf8;font-weight:600;}}
        .onion{{display:flex;flex-direction:column;align-items:center;gap:.5rem;background:#1e293b;padding:1.5rem;border-radius:var(--radius-lg);border:1px solid var(--border-color);margin-bottom:1.5rem;}}
        .onion-layer{{width:100%;max-width:420px;text-align:center;padding:.75rem;border-radius:var(--radius-md);font-weight:700;border:1px solid rgba(255,255,255,.1);}}
        .layer-p{{background:#ef4444;color:#fee2e2;}}
        .layer-i{{background:#f59e0b;color:#fef3c7;}}
        .layer-a{{background:#3b82f6;color:#dbeafe;}}
        .layer-d{{background:#10b981;color:#d1fae5;}}
    </style>
</head>
<body>
    <h1>{title}</h1>
{body}
    <div class="lesson-footer">
        <a href="{prev_href}" class="btn btn-secondary">{prev_label}</a>
        <a href="{next_href}" class="btn btn-primary">{next_label}</a>
    </div>
    <script>
{js}
    </script>
</body>
</html>"""

def write_lesson(filename, title, body, js, prev_href, prev_label, next_href, next_label):
    path = os.path.join(LESSONS_DIR, filename)
    content = base_template.format(
        title=title, body=body, js=js,
        prev_href=prev_href, prev_label=prev_label,
        next_href=next_href, next_label=next_label
    )
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Written: {filename}")

# -----------------------------------------------------------
# Build Lesson Files
# -----------------------------------------------------------

lessons = []

# ---- 1 ----
q1, js1 = quiz(
    "What is the core advantage that Object-Oriented Programming provides over Procedure-Oriented Programming for business systems?",
    "Grouping related state and behavior together in reusable class objects.",
    ["Executing machine code directly without the need for compilation.",
     "Fetching database rows faster using raw optimized SQL queries.",
     "Managing DNS routing tables between network infrastructure nodes.",
     "Rendering pixel-level graphics inside a real-time game engine loop."],
    "OOP bundles both state (fields) and behavior (methods) into a single class, mirroring real-world business entities. This dramatically improves code organization, reuse, and maintainability compared to separating data and functions in procedural code."
)
l1_sandbox = """    <div class="code-editor-container">
        <textarea id="sandbox1" class="code-textarea" spellcheck="false">// Fill in the blank: What keyword creates a class in C#?
public __________ BankAccount {
    private double balance;
    public BankAccount(double initial) { balance = initial; }
    public double GetBalance() { return balance; }
}</textarea>
        <button class="btn btn-primary" style="margin-top:1rem" onclick="runTest1()">&#9654; Run Code Tests</button>
        <div id="test-result1" class="test-result-box"></div>
    </div>"""
l1_js_extra = """
        function runTest1() {
            var code = document.getElementById('sandbox1').value;
            var box = document.getElementById('test-result1');
            box.style.display = 'block';
            if (/public\s+class\s+BankAccount/.test(code)) {
                box.className = 'test-result-box alert-success';
                box.innerHTML = '&#10003; <strong>Success!</strong> Correct — <mark>class</mark> is the keyword for defining an OOP blueprint in C#.';
            } else {
                box.className = 'test-result-box alert-warning';
                box.innerHTML = '&#10007; <strong>Try again.</strong> Fill in the blank with the keyword that declares a type blueprint in C#.';
            }
        }"""
body1 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Understand why we use OOP in business systems and how to model business domains into Classes and Objects in C#, with comparisons to C++ and Java.</div>

    <h2>1. Why Do Most Business Systems Use OOP?</h2>
    <p>In traditional <mark>Procedure-Oriented Programming</mark>, we focus primarily on procedures and functions, keeping data separated from logic. For complex business systems like sales, banking, or inventory, data and business rules are tightly coupled. <mark>Object-Oriented Programming</mark> solves this by modelling concepts as <strong>Objects</strong> that contain both:</p>
    <ul>
        <li><strong>State (Data/Attributes):</strong> e.g. bank account balance, customer name, product price.</li>
        <li><strong>Behavior (Business Rules):</strong> e.g. withdrawing money (checking balance first), calculating discounts.</li>
    </ul>

    <h2>2. Class vs Object — Blueprint vs Instance</h2>
    <ul>
        <li><mark>Class</mark>: The blueprint or template defining what data and behaviors an entity has.</li>
        <li><mark>Object</mark>: A real instance created from a class (e.g. Somchai's bank account holding $5,000).</li>
    </ul>

    <h2>3. Creating Classes Across Languages</h2>
    <div class="lang-comparison">
        <div class="lang-column">
            <div class="lang-header"><span>C++</span><span class="lang-badge lang-cpp">Systems</span></div>
            <pre><code>class BankAccount {{
private:
    double balance;
public:
    BankAccount(double b) {{ balance = b; }}
    double getBalance() {{ return balance; }}
}};</code></pre>
        </div>
        <div class="lang-column">
            <div class="lang-header"><span>C#</span><span class="lang-badge lang-csharp">Backend</span></div>
            <pre><code>public class BankAccount {{
    private double balance;
    public BankAccount(double b) {{ balance = b; }}
    public double GetBalance() => balance;
}}</code></pre>
        </div>
        <div class="lang-column">
            <div class="lang-header"><span>Java</span><span class="lang-badge lang-java">Backend</span></div>
            <pre><code>public class BankAccount {{
    private double balance;
    public BankAccount(double b) {{ this.balance = b; }}
    public double getBalance() {{ return balance; }}
}}</code></pre>
        </div>
    </div>
    
    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (BankAccount)</div>
        <p>In the running application, we instantiate the <code>BankAccount</code> class. Here is how it behaves:</p>
        <ol>
            <li>An instance is created with an initial balance (e.g., $1000).</li>
            <li>We call the <code>Deposit(amount)</code> method (e.g., depositing $150).</li>
            <li>The internal private balance state changes, and <code>GetBalance()</code> returns the new value ($1150).</li>
        </ol>
        <p>👉 <strong>Try it live:</strong> Open <a href="http://localhost:5239/lesson1/bankaccount?deposit=150" target="_blank">http://localhost:5239/lesson1/bankaccount?deposit=150</a> in your browser to trigger this code and see the JSON output.</p>
    </div>

    <h2>4. Interactive Quiz</h2>
    {q1}

    <h2>5. Coding Exercise</h2>
    <p><strong>Task:</strong> Fill in the blank with the C# keyword that declares a type blueprint.</p>
    {l1_sandbox}
"""
write_lesson("0001-oop-introduction.html", "Lesson 1: Introduction to OOP", body1, js1 + l1_js_extra, "../MISSION.md", "Mission Overview", "0002-encapsulation-properties.html", "Next: Encapsulation &rarr;")

# ---- 2 ----
q2, js2 = quiz(
    "Why do we declare class fields as private and expose them through C# Properties rather than making fields public?",
    "To enforce validation and business rules on every single data write operation.",
    ["To make the compiled binary DLL smaller and faster to load in memory.",
     "To prevent IntelliSense autocomplete from suggesting the field name.",
     "To speed up CPU branch prediction in the Just-In-Time compiler pipeline.",
     "To hide the class from being discovered by other compiled assemblies."],
    "Encapsulation via Properties lets you run validation logic (e.g. reject negative prices) inside the setter every time a value is assigned. Public fields bypass all such checks, opening the door to invalid states in your business objects."
)
body2 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Understand <mark>Encapsulation</mark> and use C# <mark>Properties</mark> to protect business data from invalid modifications.</div>

    <h2>1. The Problem Without Encapsulation</h2>
    <p>If the <code>price</code> field is public, any code can write invalid data directly:</p>
    <pre><code>var product = new Product();
product.price = -500.00; // &#x1F6D1; Negative price breaks accounting!</code></pre>

    <h2>2. Why We Need Encapsulation</h2>
    <div class="why-card">
        <div class="why-title">&#10067; Why Do We Need Encapsulation?</div>
        <ul>
            <li><mark>Data Integrity:</mark> Business rules can be enforced inside the setter — the object always stays in a valid state.</li>
            <li><mark>Single Point of Control:</mark> If the validation rule changes (e.g. price must be &gt; 0 not &gt;= 0), you fix it in one place only.</li>
            <li><mark>Hide Implementation:</mark> The caller doesn't need to know whether the value is stored as <code>double</code> or <code>decimal</code>.</li>
        </ul>
    </div>

    <h2>3. C# Properties — get / set</h2>
    <pre><code>public class Product {{
    private double _price; // Backing field (hidden)

    public double Price {{
        get {{ return _price; }}
        set {{
            if (value >= 0)
                _price = value;
            else
                _price = 0; // Enforce non-negative price
        }}
    }}
}}</code></pre>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (Encapsulation Guard)</div>
        <p>In the running application, assigning to <code>Price</code> triggers the encapsulated logic:</p>
        <ul>
            <li><strong>Valid assignment:</strong> Setting <code>price=120</code> passes the condition <code>value >= 0</code>, so 120 is stored.</li>
            <li><strong>Invalid assignment:</strong> Setting <code>price=-50</code> fails the condition, activating the fallback: it is set to <code>0</code>.</li>
        </ul>
        <p>👉 <strong>Try it live (Negative Value):</strong> Access <a href="http://localhost:5239/lesson2/product?price=-50" target="_blank">http://localhost:5239/lesson2/product?price=-50</a></p>
        <p>👉 <strong>Try it live (Valid Value):</strong> Access <a href="http://localhost:5239/lesson2/product?price=120" target="_blank">http://localhost:5239/lesson2/product?price=120</a></p>
    </div>

    <h2>4. Interactive Quiz</h2>
    {q2}

    <h2>5. Coding Exercise</h2>
    <p><strong>Task:</strong> Make the <code>price</code> field private and complete the <code>if</code> condition so only non-negative values are accepted.</p>
    <div class="code-editor-container">
        <textarea id="sandbox2" class="code-textarea" spellcheck="false">// 1. Change 'public' to 'private'
public double _price;

public double Price {{
    get {{ return _price; }}
    set {{
        // 2. Complete the condition (accept when value >= 0)
        if (__________) {{
            _price = value;
        }} else {{
            _price = 0;
        }}
    }}
}}</textarea>
        <button class="btn btn-primary" style="margin-top:1rem" onclick="runTest2()">&#9654; Run Code Tests</button>
        <div id="test-result2" class="test-result-box"></div>
    </div>
"""
js2_extra = """
        function runTest2() {
            var code = document.getElementById('sandbox2').value;
            var box = document.getElementById('test-result2');
            box.style.display = 'block';
            var hasPrivate = /private\s+double\s+_price/.test(code);
            var hasCond = /value\s*>=\s*0/.test(code) || /0\s*<=\s*value/.test(code);
            if (!hasPrivate) {
                box.className='test-result-box alert-warning';
                box.innerHTML='&#10007; The field must be declared <mark>private</mark>.'; return;
            }
            if (!hasCond || code.includes('__________')) {
                box.className='test-result-box alert-warning';
                box.innerHTML='&#10007; Complete the condition: <code>value >= 0</code>.'; return;
            }
            box.className='test-result-box alert-success';
            box.innerHTML='&#10003; <strong>Success!</strong> Encapsulation implemented correctly — the price is now protected.';
        }"""
lessons.append(("0002-encapsulation-properties.html","Lesson 2: Encapsulation & Properties",body2, js2+js2_extra,"&larr; Lesson 1","0001-oop-introduction.html","0003-inheritance-polymorphism.html","Next: Inheritance &rarr;"))

# ---- 3 ----
q3, js3 = quiz(
    "What concrete software problem does Polymorphism eliminate most effectively in business rule code?",
    "Repetitive if-else type-checking branches scattered throughout the codebase.",
    ["Slow EF Core database query plan compilation at application startup.",
     "Missing firewall configuration between microservice network pods.",
     "Broken CSS flexbox layouts on narrow mobile viewport sizes.",
     "Unoptimized image compression ratios in static asset pipelines."],
    "Without Polymorphism, adding a new customer type requires finding and editing every if-else chain in the system. With Polymorphism, each subclass overrides the virtual method and the runtime dispatches the right version automatically — making the codebase Open for extension and Closed for modification."
)
body3 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Understand <mark>Inheritance</mark> and <mark>Polymorphism</mark>, and how they eliminate repetitive <code>if-else</code> type-checking branches in business systems.</div>

    <h2>1. The Problem — if-else Type Checking</h2>
    <p>Without Polymorphism, every piece of business logic must manually branch per customer type:</p>
    <pre><code>// &#x1F6D1; Adding a new type forces edits across the entire codebase
if (customer.Type == "VIP")     {{ discount = 0.10; }}
else if (customer.Type == "Gold")  {{ discount = 0.05; }}
else if (customer.Type == "Guest") {{ discount = 0.00; }}</code></pre>

    <h2>2. The Solution — Inheritance + Polymorphism</h2>
    <ul>
        <li><mark>Inheritance</mark>: A child class reuses all fields and methods from a parent class using the <code>:</code> operator.</li>
        <li><mark>Polymorphism</mark>: A child class redefines a parent method using <code>virtual</code> + <code>override</code>. The runtime automatically dispatches the correct version at runtime.</li>
    </ul>
    <pre><code>public class Customer {{
    public string Name {{ get; set; }}
    public virtual double GetDiscountRate() => 0.0; // Default: no discount
}}

public class VipCustomer : Customer {{
    public override double GetDiscountRate() => 0.10; // 10% discount
}}

public class GoldCustomer : Customer {{
    public override double GetDiscountRate() => 0.05; // 5% discount
}}</code></pre>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (Polymorphic Binding)</div>
        <p>In the running application, we invoke the discount rate calculation based on the dynamic type of the object:</p>
        <ul>
            <li>If you pass <code>type=VIP</code>, the runtime binds to the <code>VipCustomer</code> instance, returning 0.10 (10%).</li>
            <li>If you pass <code>type=Gold</code>, it binds to <code>GoldCustomer</code>, returning 0.05 (5%).</li>
            <li>If you pass any other value, it binds to the base <code>Customer</code> class, returning 0.00 (0%).</li>
        </ul>
        <p>👉 <strong>Try it live (VIP):</strong> Access <a href="http://localhost:5239/lesson3/discount?type=VIP" target="_blank">http://localhost:5239/lesson3/discount?type=VIP</a></p>
        <p>👉 <strong>Try it live (Gold):</strong> Access <a href="http://localhost:5239/lesson3/discount?type=Gold" target="_blank">http://localhost:5239/lesson3/discount?type=Gold</a></p>
    </div>

    <h2>3. Interactive Quiz</h2>
    {q3}

    <h2>4. Coding Exercise</h2>
    <p><strong>Task:</strong> Make <code>VipCustomer</code> inherit from <code>Customer</code> and properly <code>override</code> the discount method.</p>
    <div class="code-editor-container">
        <textarea id="sandbox3" class="code-textarea" spellcheck="false">public class Customer {{
    public virtual double GetDiscountRate() => 0.0;
}}

// 1. Inherit VipCustomer from Customer
public class VipCustomer __________ Customer {{

    // 2. Add 'override' keyword to redefine the discount
    public double GetDiscountRate() {{
        return 0.10;
    }}
}}</textarea>
        <button class="btn btn-primary" style="margin-top:1rem" onclick="runTest3()">&#9654; Run Code Tests</button>
        <div id="test-result3" class="test-result-box"></div>
    </div>
"""
js3_extra = """
        function runTest3() {
            var code = document.getElementById('sandbox3').value;
            var box = document.getElementById('test-result3');
            box.style.display = 'block';
            var hasInherit = /class\s+VipCustomer\s*:\s*Customer/.test(code);
            var hasOverride = /public\s+override\s+double\s+GetDiscountRate/.test(code);
            if (!hasInherit) { box.className='test-result-box alert-warning'; box.innerHTML='&#10007; Inheritance not found. Use <code>: Customer</code>.'; return; }
            if (!hasOverride) { box.className='test-result-box alert-warning'; box.innerHTML='&#10007; Missing <mark>override</mark> keyword on GetDiscountRate.'; return; }
            box.className='test-result-box alert-success';
            box.innerHTML='&#10003; <strong>Success!</strong> Polymorphism implemented correctly!';
        }"""
lessons.append(("0003-inheritance-polymorphism.html","Lesson 3: Inheritance & Polymorphism",body3,js3+js3_extra,"&larr; Lesson 2","0002-encapsulation-properties.html","0004-interfaces-abstract-classes.html","Next: Interfaces &rarr;"))

# ---- 4 ----
q4, js4 = quiz(
    "What is the PRIMARY architectural benefit of programming against an Interface rather than a concrete class?",
    "It decouples callers from implementation details, enabling easy swapping.",
    ["It automatically generates XML comments and API documentation schemas.",
     "It reduces the heap memory allocated per object instantiation cycle.",
     "It enables browser caching of JavaScript files via service workers.",
     "It speeds up SQL Server query plan compilation during application start."],
    "When code depends on an interface, you can swap the concrete class (e.g. StripeGateway → PaypalGateway) without touching any caller. This is the foundation of Dependency Injection, testability with mocks, and the Open/Closed Principle."
)
body4 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Master Interfaces and Abstract Classes — when to use each, why you need them, and how they enable loose coupling and testable systems.</div>

    <h2>1. Interfaces — Pure Contracts</h2>
    <div class="why-card">
        <div class="why-title">&#10067; Why Do We Need Interfaces?</div>
        <ul>
            <li><mark>Loose Coupling:</mark> High-level business logic stays isolated from low-level implementation details. Swap payment gateways, email providers, or database drivers without touching the core system.</li>
            <li><mark>Testability:</mark> In unit tests, inject a fake (mock) implementation that returns controlled data — no live API or database needed.</li>
            <li><mark>Open/Closed Principle:</mark> New implementations can be added without modifying any existing code. A true plugin system.</li>
        </ul>
    </div>
    <pre><code>public interface INotificationSender {{
    void Send(string recipient, string message);
}}</code></pre>

    <h2>2. Abstract Classes — Partial Blueprints</h2>
    <div class="why-card">
        <div class="why-title">&#10067; Why Do We Need Abstract Classes?</div>
        <ul>
            <li><mark>Code Reuse:</mark> Write shared implementation once in the base — all subclasses inherit it without duplication.</li>
            <li><mark>Template Method Pattern:</mark> Define the fixed workflow skeleton in the abstract class, while leaving specific steps for subclasses to implement.</li>
            <li><mark>Shared State:</mark> Unlike interfaces, abstract classes can hold fields and properties shared across all subclasses.</li>
        </ul>
    </div>
    <pre><code>public abstract class ReportGenerator {{
    public void GenerateReport() {{
        OpenConnection();
        var data = FetchData();      // abstract: subclass provides
        var report = Format(data);   // abstract: subclass provides
        Print(report);
        CloseConnection();
    }}
    protected abstract string FetchData();
    protected abstract string Format(string raw);
}}</code></pre>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (Template Method Pattern)</div>
        <p>In the running application, we trigger the <code>GenerateReport()</code> method on the abstract class:</p>
        <ol>
            <li>The abstract base class runs <code>OpenConnection()</code> (shared logic).</li>
            <li>It triggers the abstract <code>FetchData()</code>, which resolves to the subclass override returning <em>"Financial ledger rows"</em>.</li>
            <li>It triggers the abstract <code>FormatReport()</code>, which wraps the text inside `[PDF-Report] Styled:`.</li>
            <li>It completes by running the shared <code>CloseConnection()</code> step.</li>
        </ol>
        <p>👉 <strong>Try it live:</strong> Open <a href="http://localhost:5239/lesson4/report" target="_blank">http://localhost:5239/lesson4/report</a> to trigger the template method workflow and view the structured execution logs.</p>
    </div>

    <h2>3. Interactive Quiz</h2>
    {q4}

    <h2>4. Coding Exercise</h2>
    <p><strong>Task:</strong> Declare the <code>IPaymentProcessor</code> interface and implement it in <code>StripeProcessor</code>.</p>
    <div class="code-editor-container">
        <textarea id="sandbox4" class="code-textarea" spellcheck="false">// 1. Replace the blank with the correct keyword
public __________ IPaymentProcessor {{
    void Pay(double amount);
}}

// 2. Implement the interface in StripeProcessor
public class StripeProcessor __________ IPaymentProcessor {{
    public void Pay(double amount) {{
        Console.WriteLine($"Stripe charged: {{amount}}");
    }}
}}</textarea>
        <button class="btn btn-primary" style="margin-top:1rem" onclick="runTest4()">&#9654; Run Code Tests</button>
        <div id="test-result4" class="test-result-box"></div>
    </div>
"""
js4_extra = """
        function runTest4() {
            var code = document.getElementById('sandbox4').value;
            var box = document.getElementById('test-result4');
            box.style.display = 'block';
            var hasInterface = /public\s+interface\s+IPaymentProcessor/.test(code);
            var hasImpl = /class\s+StripeProcessor\s*:\s*IPaymentProcessor/.test(code);
            if (!hasInterface) { box.className='test-result-box alert-warning'; box.innerHTML='&#10007; Use the <mark>interface</mark> keyword to declare IPaymentProcessor.'; return; }
            if (!hasImpl) { box.className='test-result-box alert-warning'; box.innerHTML='&#10007; StripeProcessor must implement IPaymentProcessor using <code>:</code>.'; return; }
            box.className='test-result-box alert-success';
            box.innerHTML='&#10003; <strong>Success!</strong> Interface contract defined and implemented correctly.';
        }"""
lessons.append(("0004-interfaces-abstract-classes.html","Lesson 4: Interfaces & Abstract Classes (Deep Dive)",body4,js4+js4_extra,"&larr; Lesson 3","0003-inheritance-polymorphism.html","0005-dotnet-cli-webapi.html","Next: .NET Web API &rarr;"))

for (filename, title, body, js, prev_label, prev_href, next_href, next_label) in lessons:
    write_lesson(filename, title, body, js, prev_href, prev_label, next_href, next_label)

# ---- 5 ----
q5, js5 = quiz(
    "Which .NET CLI command watches for file changes and automatically reloads the running application without a full restart?",
    "dotnet watch — monitors source files and hot-reloads on save.",
    ["dotnet build — compiles the project to check for errors only.",
     "dotnet publish — bundles the app for production deployment.",
     "dotnet restore — downloads missing NuGet package dependencies.",
     "dotnet test — discovers and executes all unit test suites."],
    "'dotnet watch' wraps 'dotnet run' with a file system watcher. On any .cs file save, it recompiles and hot-reloads the app instantly — critical for a fast inner development loop."
)
body5 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Master .NET enterprise capabilities, the HTTP <mark>Middleware</mark> pipeline, the IoC Container, and real-world <mark>Minimal API</mark> endpoint patterns.</div>

    <h2>1. HTTP Request Pipeline &amp; Middleware</h2>
    <p>Every incoming HTTP request passes through a chain of <mark>Middleware</mark> components before reaching the endpoint handler. Order matters.</p>

    <h3>Custom Middleware: API Key Guard</h3>
    <pre><code>public class ApiKeyMiddleware {{
    public async Task InvokeAsync(HttpContext ctx) {{
        if (!ctx.Request.Headers.TryGetValue("X-Api-Key", out var key)) {{
            ctx.Response.StatusCode = 401; // Short-circuit
            return;
        }}
        await _next(ctx); // Pass forward
    }}
}}</code></pre>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (Custom Middleware Pipeline)</div>
        <p>In the running application, we have registered the custom <code>ApiKeyMiddleware</code>. It behaves as follows:</p>
        <ul>
            <li><strong>Failed verification:</strong> Try opening the secure URL below. Because your browser does not send the header <code>X-Api-Key: Secret_123</code>, the middleware short-circuits and rejects you with a 401 Unauthorized status.</li>
            <li><strong>Successful verification:</strong> Sending the request with the header authorized passes the check and allows you to fetch the secret data.</li>
        </ul>
        <p>👉 <strong>Try it live (Will Fail):</strong> Access the protected endpoint directly: <a href="http://localhost:5239/lesson5/secure-data" target="_blank">http://localhost:5239/lesson5/secure-data</a></p>
    </div>

    <h2>2. Real-World Minimal API Endpoints (C#)</h2>
    <pre><code>app.MapGet("/products/search", (string? name, double? minPrice) =&gt; {{
    return dummyProducts.Where(p =&gt; p.Name.Contains(name) &amp;&amp; p.Price &gt;= minPrice);
}});</code></pre>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (Minimal API Filtering)</div>
        <p>This endpoint receives query parameters, runs a LINQ query to filter data, and returns the result as JSON:</p>
        <p>👉 <strong>Try it live:</strong> Open <a href="http://localhost:5239/lesson5/search?name=Laptop&minPrice=1000" target="_blank">http://localhost:5239/lesson5/search?name=Laptop&minPrice=1000</a> to query for products.</p>
    </div>

    <h2>3. Interactive Quiz</h2>
    {q5}
"""
write_lesson("0005-dotnet-cli-webapi.html","Lesson 5: .NET CLI, Middleware & Minimal APIs",body5,js5,"0004-interfaces-abstract-classes.html","&larr; Lesson 4","0006-solid-principles-sol.html","Next: SOLID S-O-L &rarr;")

# ---- 6 ----
q6, js6 = quiz(
    "A FixedDepositAccount inherits BankAccount which has a Withdraw() method. FixedDepositAccount throws NotSupportedException from Withdraw. Which SOLID principle is violated?",
    "Liskov Substitution Principle — a subtype broke the base class contract.",
    ["Single Responsibility Principle — the class has too many responsibilities.",
     "Open/Closed Principle — the stable base class was modified directly.",
     "Interface Segregation Principle — unused methods were forced onto a client.",
     "Dependency Inversion Principle — high-level code depends on low-level details."],
    "LSP requires that any subtype can safely replace its base type without breaking callers. FixedDepositAccount violates this because code expecting a BankAccount can call Withdraw() and receive an unexpected exception. The fix is to extract IWithdrawable as a separate interface."
)
body6 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Master the first three SOLID principles — <mark>SRP</mark>, <mark>OCP</mark>, and <mark>LSP</mark> — through rich business case studies showing exactly what breaks and how to fix it.</div>

    <h2>1. S — Single Responsibility Principle (SRP)</h2>
    <p>A class that calculates taxes, saves to DB, and sends emails has 3 reasons to change. Split them into separate focused classes.</p>

    <h2>2. O — Open/Closed Principle (OCP)</h2>
    <p>We should be able to add new payment methods (like PayPal or PromptPay) without modifying the core checkout class. Interfaces make the system open for extension but closed for modification.</p>

    <h2>3. L — Liskov Substitution Principle (LSP)</h2>
    <p>Any subclass must be fully substitutable for its base class without crashing client code. Overriding a method just to throw <code>NotSupportedException</code> violates LSP.</p>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (SOLID Playground)</div>
        <p>To make the consequences of violating or conforming to SOLID principles clear, you can run bad and good implementations side-by-side on the playground server:</p>
        <ul>
            <li><strong>SRP (Bad vs Good):</strong> Compare how a monolithic class service behaves compared to a decoupled structure.
                <br>👉 <a href="http://localhost:5239/lessons/srp/bad?orderId=101&amount=500&email=test@test.com" target="_blank">Run Bad SRP</a> | <a href="http://localhost:5239/lessons/srp/good?orderId=101&amount=500&email=test@test.com" target="_blank">Run Good SRP</a>
            </li>
            <li><strong>OCP (Bad vs Good):</strong> See how trying to pay with a new gateway (PromptPay) causes a crash in the hardcoded Bad class, but works seamlessly in the Good class.
                <br>👉 <a href="http://localhost:5239/lessons/ocp/bad?gateway=PromptPay&amount=250" target="_blank">Run Bad OCP (Throws Error)</a> | <a href="http://localhost:5239/lessons/ocp/good?gateway=PromptPay&amount=250" target="_blank">Run Good OCP (Success)</a>
            </li>
            <li><strong>LSP (Bad vs Good):</strong> Trigger a loop that calls <code>Withdraw</code> across different accounts. The Bad implementation throws an exception and crashes the process. The Good implementation uses segregated interfaces to guarantee safety.
                <br>👉 <a href="http://localhost:5239/lessons/lsp/bad" target="_blank">Run Bad LSP (App Crash!)</a> | <a href="http://localhost:5239/lessons/lsp/good" target="_blank">Run Good LSP</a>
            </li>
        </ul>
    </div>

    <h2>4. Interactive Quiz</h2>
    {q6}
"""
write_lesson("0006-solid-principles-sol.html","Lesson 6: SOLID — S, O, L Principles",body6,js6,"0005-dotnet-cli-webapi.html","&larr; Lesson 5","0007-solid-principles-id.html","Next: SOLID I-D &rarr;")

# ---- 7 ----
q7, js7 = quiz(
    "An IPrinter interface has Print(), Scan(), Fax(), and Staple(). BasicPrinter implements it but cannot Scan or Fax — it just throws NotImplementedException. Which SOLID principle is violated?",
    "Interface Segregation Principle — the interface is too broad for BasicPrinter.",
    ["Liskov Substitution Principle — BasicPrinter breaks base class behavior.",
     "Open/Closed Principle — the interface was modified for extension.",
     "Single Responsibility Principle — BasicPrinter has too many concerns.",
     "Dependency Inversion Principle — module depends on detail."],
    "ISP states clients must not be forced to implement methods they don't use. The fix: split IPrinter into IPrintable, IScannable, IFaxable. BasicPrinter then implements only IPrintable — no wasted stubs."
)
body7 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Master the final two SOLID principles — <mark>ISP</mark> (Interface Segregation) and <mark>DIP</mark> (Dependency Inversion) — the cornerstones of loose coupling.</div>

    <h2>1. I — Interface Segregation Principle (ISP)</h2>
    <p>Do not force classes to implement methods they do not use. Split fat interfaces into small, cohesive contracts.</p>

    <h2>2. D — Dependency Inversion Principle (DIP)</h2>
    <p>High-level modules should not create concrete database or payment classes directly inside themselves using <code>new</code>. Instead, receive abstractions (interfaces) through <mark>Constructor Injection</mark>.</p>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (DIP Integration)</div>
        <p>In the running application, we demonstrate how Dependency Inversion changes service initialization:</p>
        <ul>
            <li><strong>Bad DIP:</strong> The checkout class directly instantiates and calls <code>StripeGatewayMock</code> internally using <code>new</code>. Swapping payment method requires code modification.
                <br>👉 <a href="http://localhost:5239/lessons/dip/bad?amount=100" target="_blank">Run Bad DIP (Tightly Coupled)</a>
            </li>
            <li><strong>Good DIP:</strong> The class receives `IPaymentGateway` interface via DI. The framework resolves the StripeGateway automatically.
                <br>👉 <a href="http://localhost:5239/lessons/dip/good?amount=100" target="_blank">Run Good DIP (Constructor DI)</a>
            </li>
        </ul>
    </div>

    <h2>3. Interactive Quiz</h2>
    {q7}
"""
write_lesson("0007-solid-principles-id.html","Lesson 7: SOLID — I, D Principles",body7,js7,"0006-solid-principles-sol.html","&larr; Lesson 6","0008-unit-testing-tdd.html","Next: Unit Testing &rarr;")

# ---- 8 ----
q8, js8 = quiz(
    "In TDD, after writing a failing Red test, what must happen BEFORE you refactor?",
    "Write minimal production code to make the test pass (Green phase).",
    ["Delete the failing test since the feature does not exist yet.",
     "Refactor the code architecture to follow Clean Architecture first.",
     "Deploy to staging and run full integration and E2E test suites.",
     "Document all the reasons why the test was failing in detail."],
    "The TDD cycle is strictly Red → Green → Refactor. Green means writing the absolute minimum code to satisfy the assertion. Only after the test is green can you safely refactor — the passing test is your safety net."
)
body8 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Understand <mark>Unit Testing</mark>, the <mark>Test-Driven Development</mark> cycle, and how to write assertions in C# with xUnit.</div>

    <h2>1. TDD Cycle — Red → Green → Refactor</h2>
    <div class="tdd-step"><span class="badge badge-red">1. Red</span><div><strong>Write a failing test first.</strong> Confirms the test is checking something real.</div></div>
    <div class="tdd-step"><span class="badge badge-green">2. Green</span><div><strong>Write minimum production code to pass.</strong> Keep it as simple as possible.</div></div>
    <div class="tdd-step"><span class="badge badge-blue">3. Refactor</span><div><strong>Clean up the code.</strong> Backed by passing tests as a safety net.</div></div>

    <h2>2. xUnit Assertions (Arrange-Act-Assert)</h2>
    <pre><code>[Fact]
public void Add_ReturnsSumOfInputs() {{
    var calc = new Calculator();
    int result = calc.Add(7, 8);
    Assert.Equal(15, result);
}}</code></pre>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (Test Suite Runner)</div>
        <p>In the running application, we have a mock Test Suite Runner endpoint that runs assertions on your classes in real-time:</p>
        <ol>
            <li>It compiles and arranges the <code>Calculator</code> and tests the math outputs.</li>
            <li>It asserts the validation rules of <code>Product</code> encapsulation.</li>
            <li>It returns the test pass/fail breakdown as a JSON report.</li>
        </ol>
        <p>👉 <strong>Try it live:</strong> Open <a href="http://localhost:5239/lesson8/run-tests" target="_blank">http://localhost:5239/lesson8/run-tests</a> to run the local mock assertions.</p>
    </div>

    <h2>3. Interactive Quiz</h2>
    {q8}
"""
write_lesson("0008-unit-testing-tdd.html","Lesson 8: Unit Testing & Test-Driven Development",body8,js8,"0007-solid-principles-id.html","&larr; Lesson 7","0009-dependency-injection-lifetimes.html","Next: DI Lifetimes &rarr;")

# ---- 9 ----
q9, js9 = quiz(
    "You need a DatabaseContext that shares the same change-tracking state across all services within a single HTTP request. Which lifetime should you use?",
    "Scoped — one instance created and shared per HTTP request.",
    ["Singleton — one instance shared across every request from all users.",
     "Transient — a brand new instance created each time it is injected.",
     "Pooled — the instance is borrowed from a pre-built reuse object pool.",
     "Hosted — a background long-running service worker lifetime setting."],
    "DbContext must track all changes made across one HTTP request as a single unit of work. Scoped achieves this: one instance per request. If Singleton, two concurrent users share one DbContext and corrupt each other's pending changes."
)
body9 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Understand <mark>Dependency Injection</mark> architecture and master the three core service lifetimes: <mark>Transient</mark>, <mark>Scoped</mark>, <mark>Singleton</mark>.</div>

    <h2>1. The Three Service Lifetimes</h2>
    <table class="lifetime-table">
        <thead><tr><th>Lifetime</th><th>When Created</th><th>Best For</th></tr></thead>
        <tbody>
            <tr><td><mark>Transient</mark></td><td>A new instance <strong>every time</strong> injected</td><td>Stateless helpers: validators, formatters</td></tr>
            <tr><td><mark>Scoped</mark></td><td>One instance <strong>per HTTP request</strong></td><td>DbContext, request-scoped state</td></tr>
            <tr><td><mark>Singleton</mark></td><td>One instance <strong>for the app's entire lifespan</strong></td><td>Memory caches, config readers</td></tr>
        </tbody>
    </table>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (Lifetime Visualizer)</div>
        <p>In the running application, we inject two instances of each lifetime into a single HTTP request handler, returning their internal unique Guid IDs:</p>
        <ul>
            <li><strong>Transient:</strong> Returns 2 different IDs. (Two separate objects created).</li>
            <li><strong>Scoped:</strong> Returns the exact same ID twice. (Reused within this request. If you reload the page, the ID changes).</li>
            <li><strong>Singleton:</strong> Returns the exact same ID twice. (Reused. If you reload or open in a different browser, the ID never changes!).</li>
        </ul>
        <p>👉 <strong>Try it live:</strong> Open <a href="http://localhost:5239/lesson9/lifetimes" target="_blank">http://localhost:5239/lesson9/lifetimes</a> in multiple tabs and compare the IDs.</p>
    </div>

    <h2>2. Interactive Quiz</h2>
    {q9}
"""
write_lesson("0009-dependency-injection-lifetimes.html","Lesson 9: DI & Service Lifetimes",body9,js9,"0008-unit-testing-tdd.html","&larr; Lesson 8","0010-registering-di-services.html","Next: Service Registration &rarr;")

# ---- 10 ----
q10, js10 = quiz(
    "After registering builder.Services.AddScoped<IOrderService, OrderService>(), what does .NET do automatically when OrderService's constructor needs IProductRepository and IEmailService?",
    ".NET resolves and injects all constructor dependencies recursively at runtime.",
    ["OrderService is compiled into a separate DLL assembly on first request.",
     "IOrderService interface methods are automatically implemented by the CLR.",
     "The registration caches OrderService as a Singleton regardless of lifetime.",
     "Only the first injection resolves; subsequent ones use cached reflection data."],
    "The .NET IoC container performs recursive dependency resolution. It inspects OrderService's constructor, finds IProductRepository and IEmailService, looks them up in the registration table, creates their instances (resolving their own dependencies too), and wires everything together automatically."
)
body10 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Master service registration in <code>Program.cs</code>, understand how .NET performs recursive dependency resolution, and trace the DI wiring.</div>

    <h2>1. Recursive DI Resolution</h2>
    <p>When the app requests `IOrderService`, .NET inspects its constructor and resolves all of its dependencies recursively:</p>
    <pre><code>public OrderService(IProductRepo repo, IEmailService email) {{ ... }}</code></pre>
    <p>If `SqlProductRepo` itself has dependencies (like `DbContext`), .NET will instantiate those first, recursively building the object tree.</p>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (Program.cs DI Bootstrap)</div>
        <p>In our restructured projects, the service registrations are extracted into Clean Architecture layers:
        <ul>
            <li><code>builder.Services.AddApplicationServices()</code> registers use case handlers.</li>
            <li><code>builder.Services.AddInfrastructureServices()</code> registers concrete repositories and payment systems.</li>
        </ul>
        This keeps the entrypoint extremely clean, while letting .NET handle DI wiring behind the scenes.</p>
    </div>

    <h2>2. Interactive Quiz</h2>
    {q10}
"""
write_lesson("0010-registering-di-services.html","Lesson 10: Service Registration in Program.cs",body10,js10,"0009-dependency-injection-lifetimes.html","&larr; Lesson 9","0011-clean-architecture.html","Next: Clean Architecture &rarr;")

# ---- 11 ----
q11, js11 = quiz(
    "Your team switches from SQL Server to PostgreSQL. In Clean Architecture, which layer(s) must be changed?",
    "Only the Infrastructure layer — Domain and Application stay untouched.",
    ["Only the Domain layer where business entities are defined and stored.",
     "Only the Application layer where use case interfaces are declared.",
     "Both Presentation and Domain must be updated to match the new driver.",
     "All four layers must be updated to support the new database driver."],
    "Clean Architecture's golden rule: business logic never knows which database is used. EF Core / database code lives exclusively in Infrastructure. Swapping databases means writing a new repository implementation in Infrastructure only."
)
body11 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Master <mark>Clean Architecture</mark> layer structure, the Dependency Rule, and how it protects your business logic from infrastructure changes.</div>

    <h2>1. Concentric Onion Layers</h2>
    <div class="onion">
        <div class="onion-layer layer-p">Presentation (MyAwesomeApi) — Endpoints, Program.cs DI bootstrap</div>
        <div class="onion-layer layer-i">Infrastructure (MyAwesomeApi.Infrastructure) — EF Core, Stripe Gateway, SMTP</div>
        <div class="onion-layer layer-a">Application (MyAwesomeApi.Application) — Use Cases, Interfaces, DTOs</div>
        <div class="onion-layer layer-d">Domain (MyAwesomeApi.Domain) — Pure Entities, State, Business Rules (Zero Dependencies)</div>
    </div>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (True Project Boundaries)</div>
        <p>Our playground has been refactored into 4 physical project folders. If you look at their project configuration references:
        <ul>
            <li><code>Domain.csproj</code> has **0 references**. It is completely isolated and pure C#.</li>
            <li><code>Application.csproj</code> only references <code>Domain.csproj</code>.</li>
            <li><code>Infrastructure.csproj</code> references <code>Application.csproj</code> (to implement interfaces).</li>
            <li><code>MyAwesomeApi.csproj</code> references <code>Infrastructure.csproj</code> and <code>Application.csproj</code> to register them and expose routes.</li>
        </ul>
        This forces developers to obey the inward dependency rule at compile-time!</p>
        <p>👉 <strong>Try it live:</strong> Open <a href="http://localhost:5239/lesson11/structure" target="_blank">http://localhost:5239/lesson11/structure</a> to verify the layer boundaries namespace details.</p>
    </div>

    <h2>2. Interactive Quiz</h2>
    {q11}
"""
write_lesson("0011-clean-architecture.html","Lesson 11: Clean Architecture Structure",body11,js11,"0010-registering-di-services.html","&larr; Lesson 10","0012-repository-pattern.html","Next: Repository Pattern &rarr;")

# ---- 12 ----
q12, js12 = quiz(
    "Why should the IProductRepository interface be defined in the Application layer rather than in Infrastructure?",
    "Application owns the contract so Infrastructure must conform to it — not vice versa.",
    ["Because Infrastructure is reserved for UI and presentation concerns only.",
     "Because C# interfaces cannot reference abstract classes in the same project.",
     "Because the Application assembly is compiled before Infrastructure by MSBuild.",
     "Because .NET DI containers only scan assemblies named *.Application.dll."],
    "Placing the interface in Application ensures the Dependency Rule: Infrastructure (low-level detail) depends on Application (high-level policy). This is the core of DIP — business logic owns the contract, and infrastructure must adapt."
)
body12 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Understand the <mark>Repository Pattern</mark>, why it belongs in the Application layer, and how it decouples business logic from database technology.</div>

    <h2>1. Repository Decoupling</h2>
    <p>The <mark>Repository Pattern</mark> behaves like an in-memory collection of domain objects, hiding SQL queries and DbContext details from the core business application.</p>
    <pre><code>public interface IProductRepository {{
    IEnumerable&lt;Product&gt; GetAll();
    void Add(Product product);
}}</code></pre>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (Decoupled Persistence)</div>
        <p>In our Clean Architecture setup:
        <ol>
            <li>The Minimal API triggers the `/lesson12/products` route, receiving `IProductRepository` via DI.</li>
            <li>The interface contract resides inside the <code>Application</code> layer.</li>
            <li>The active implementation (<code>InMemoryProductRepository</code>) is loaded from the <code>Infrastructure</code> layer, returning mock product items.</li>
        </ol>
        The presentation endpoints never access the database driver or in-memory list directly, keeping layers clean.</p>
        <p>👉 <strong>Try it live:</strong> Access <a href="http://localhost:5239/lesson12/products" target="_blank">http://localhost:5239/lesson12/products</a> to query the Repository.</p>
    </div>

    <h2>2. Interactive Quiz</h2>
    {q12}
"""
write_lesson("0012-repository-pattern.html","Lesson 12: Repository Pattern",body12,js12,"0011-clean-architecture.html","&larr; Lesson 11","0013-frontend-connection.html","Next: Frontend &rarr;")

# ---- 13 ----
q13, js13 = quiz(
    "Your Vue.js app on localhost:5173 makes a fetch() call to your .NET API on localhost:5239. The browser blocks it. What is the correct fix?",
    "Configure CORS in .NET Program.cs using AddCors + WithOrigins.",
    ["Change the Vue base URL from localhost to the machine's IP address.",
     "Disable HTTPS on the .NET API to remove the protocol mismatch error.",
     "Set Access-Control-Allow-Origin inside Vue's axios default headers.",
     "Add an X-Forwarded-For header to the outgoing fetch request options."],
    "CORS is enforced by the browser, not the client script. The server must explicitly allow the origin by sending Access-Control-Allow-Origin response headers. In .NET: AddCors + UseCors with WithOrigins('http://localhost:5173') grants this permission."
)
body13 = f"""
    <div class="alert alert-info"><strong>Lesson Goal:</strong> Connect a Vue.js + Tailwind frontend to a .NET Web API, understand the full request/response cycle, and resolve <mark>CORS</mark> security blocks.</div>

    <h2>1. Resolving CORS in C#</h2>
    <p>CORS must be enabled on the server-side to allow browsers to read API responses across origins:</p>
    <pre><code>builder.Services.AddCors(options =&gt; {{
    options.AddPolicy("AllowVueApp", policy =&gt;
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()
    );
}});
...
app.UseCors("AllowVueApp");</code></pre>

    <div class="run-card">
        <div class="run-title">&#9654; Live Execution Explanation (CORS Middleware)</div>
        <p>In our registered pipeline, <code>app.UseCors("AllowAll")</code> has been registered before endpoint mappings. This sends appropriate headers (like <code>Access-Control-Allow-Origin: *</code>) to requests, resolving browser-level connection blocks when frontends make JavaScript calls.</p>
    </div>

    <h2>2. Interactive Quiz</h2>
    {q13}
"""
write_lesson("0013-frontend-connection.html","Lesson 13: Connecting Vue.js + Tailwind to .NET",body13,js13,"0012-repository-pattern.html","&larr; Lesson 12","0014-course-wrapup.html","Final Lesson &rarr;")

# ---- 14 ----
q14, js14 = quiz(
    "A new developer asks: 'Why do we inject IOrderService instead of directly using OrderService?' — what is the best architectural answer?",
    "Interfaces let us swap, test, and extend implementations without changing callers.",
    ["Because C# does not allow calling class methods without an interface prefix.",
     "Interfaces make code run faster by bypassing the JIT compilation step.",
     "The legal compliance team requires all public classes to declare interfaces.",
     "Interfaces automatically generate Swagger OpenAPI schema documentation files."],
    "Interfaces decouple the caller from the concrete type. You can inject a mock IOrderService in unit tests, swap SqlOrderService for MongoOrderService in production, or wrap it with an AuditingOrderService decorator — all without touching a single line of calling code. This is DIP, OCP, and testable architecture working together."
)
body14 = f"""
    <div class="alert alert-success"><strong>&#x1F389; Course Completed!</strong> Congratulations on completing the intensive C# / .NET / SOLID architecture crash course. Let's consolidate everything you've mastered.</div>

    <h2>1. Consolidate Your Knowledge</h2>
    <p>You have built and run code implementing:</p>
    <ul>
        <li>Polymorphic discounts and OOP encapsulation properties.</li>
        <li>Clean Architecture inward project dependencies.</li>
        <li>Mock unit tests and visual lifetimes (Transient, Scoped, Singleton).</li>
    </ul>

    <div class="run-card">
        <div class="run-title">&#127916; Architecture Visual Playground Dashboard</div>
        <p>The running API at <a href="http://localhost:5239" target="_blank">http://localhost:5239</a> has been fully upgraded with an interactive dashboard. You can toggle tabs to look at C# code segments and trigger their bad vs good outcomes directly, watching live outputs and logs.</p>
    </div>

    <h2>2. Interactive Quiz</h2>
    {q14}
"""
write_lesson("0014-course-wrapup.html","Lesson 14: Course Wrap-up & Review",body14,js14,"0013-frontend-connection.html","&larr; Lesson 13","javascript:void(0)\" onclick=\"alert('Course complete! Inform your instructor.')","&#x1F3C6; Finish Course")

print("\nAll 14 lessons regenerated with live execution details!")
