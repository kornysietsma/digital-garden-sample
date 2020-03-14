---
title: Demonstrating source code
category: tech
date: 2020-03-14
tags: [docs,samples]
---

The [gatsby-remark-prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/) plugin is pretty neat for source code formatting.

I'm tempted though to try the [gatsby-remark-vscode](https://www.gatsbyjs.org/packages/gatsby-remark-vscode/) plugin at some stage - it uses the VSCode editor's source code rendering libraries, for far more powerful syntax handling than prismjs.  It can get away with that because it is running at build time, not in a browser, so it doesn't matter if it needs to load a huge pile of dependencies...

Some quick samples:


## Rust
~~~rust
pub fn named_toxicity_indicator_calculator(
    name: &str,
    config: &CalculatorConfig,
) -> Option<Box<dyn ToxicityIndicatorCalculator>> {
    match name {
        "loc" => Some(Box::new(LocCalculator {})),
        "git" => Some(Box::new(GitCalculator::new(
            GitLogConfig::default().since_years(config.git_years),
        ))),
        "indentation" => Some(Box::new(IndentationCalculator {})),
        _ => None,
    }
}
~~~

## Bash script
~~~bash
firehose() {
  pushd ~/path/to/garden

    echo "Title: "
    read title
    echo "Tags: (comma separated) "
    read tags
    jtags="$(echo "$tags" | jq -R 'split(",")')"
    echo "Category: (tech, work, personal, play, world, meta, family, other)"
    read category
    echo "url or text:"
    read url

    pdate=`date +%Y-%m-%d`

    echo "[{
\"title\": \"$title\",
\"category\": \"$category\",
\"date\": \"$pdate\",
\"tags\": ${jtags},
\"lines\": [\"${url}\"]
}]" > /tmp/fhbit.json

INBOX=content/firehose/laptop/inbox.json
jq -s add $INBOX /tmp/fhbit.json > /tmp/fh.json
cp /tmp/fh.json $INBOX

    echo "updated $INBOX"
}
~~~

## Shell commands with a prompt
~~~bash{outputLines: 2}{promptUser: alice}{promptHost: dev.localhost}
ls -al
foo bar baz bat
~~~