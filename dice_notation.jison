/* description: Parses end evaluates mathematical expressions. */

/* lexical grammar */
%lex
%%
\s+                   { /* skip whitespace */ }
[dD]                  { return 'DICE'; }
[0-9]+                { return 'INTEGER'; }
"*"                   { return '*'; }
"/"                   { return '/'; }
"-"                   { return '-'; }
"+"                   { return '+'; }
"("                   { return '('; }
")"                   { return ')'; }
<<EOF>>               { return 'EOF'; }

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%right DICE

%start expressions

%% /* language grammar */

expressions:
      expression_list EOF                     { return $1; }
    ;

expression_list:
    /* nothing */                             { $$ = 0; }
    | expression                              { $$ = $1; }
    ;

dice_roll:
      group_or_integer DICE group_or_integer  { $$ = (yy.bag['d'+$3] || yy.bag.createDie($3))($1, 0, yy.results); }
    | DICE group_or_integer                   { $$ = (yy.bag['d'+$2] || yy.bag.createDie($2))(1, 0, yy.results); }
    ;

group_or_integer:
      INTEGER                                 { $$ = Number(yytext); }
    | grouped_expr                            { $$ = $1; }
    ;

grouped_expr:
     '(' expression ')'                       { $$ = $2; }
    ;

expression:
      expression '+' expression               { $$ = $1 + $3; }
    | expression '-' expression               { $$ = $1 - $3; }
    | expression '*' expression               { $$ = $1 * $3; }
    | expression '/' expression               { $$ = Math.floor($1 / $3); }
    | dice_roll                               { $$ = $1; }
    | group_or_integer                        { $$ = $1; }
    ;