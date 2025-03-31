import json

with open('personnage.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for liste_persos in data.values():
    for perso in liste_persos:
        if 'evolutions' in perso:
            for evolution in perso["evolutions"]:
                if 'condition' in evolution:
                    evolution["condition"] = int(evolution["condition"][-2:])

with open('personnage.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
