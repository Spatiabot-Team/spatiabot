import {ScenarioInterface} from "../domain/interfaces/scenario.interface";


export const scenarios : ScenarioInterface[] = [
  {
    "id": "1f3caa1a-29d0-4cb6-bc27-2706a609cc3f",
    "titre": "Le casino clandestin",
    "actif": true,
    "etapes": [
      {
        "id": "8da6b623-41ba-45f1-a0b9-eabcdb81aea2",
        "titre": "Rien ne va plus",
        "texte": "Voilà trois heures que vous essayez divers jeux proposé par l'établissement. Vous avez essayé les cartes dimensionnels, la bille Éthérée, la course lumière, le pari sur les combats, d'animaux ou non.\n\nSans grand résultat. Vos gains accumulés jusqu'ici ne vous ont permis que de vous prendre une boisson au bar. Le doute commence à vous gagner lorsque vous vous approchez d'une grande table très animée. Près d'une centaine de personnes hurlants, certains manifestement en train de perdre leur mise. Vous voyez sur la table une représentation holographique d'un croiseur spatial, tentant de repousser plusieurs centaines de vaisseaux. Tout autour de la table se trouvent des écrans. Vous vous placez devant l'un des rares qui ne soient pas occupé par un autre parieur et lisez les instructions.\n\n\"RÈGLES DU JEU DU MASSACRE SPATIAL\n\nLe but du jeu est de miser sur le vaisseau spatial pirate le plus performant. Plus il fait d'actions décisives, comme abattre un vaisseau ennemi ou bien endommager le croiseur, plus votre gain augmente.\n\nATTENTION : Si votre vaisseau se fait détruire, tous vos gains sont perdus.\n\nLe gros lot sera donné au joueur ayant parié sur le meilleur vaisseau, qui gagnera la totalité de la mise perdue par les autres joueurs.\n\nPOUR INFORMATION :\n\nLa bataille se déroule actuellement dans le système Naos et est retransmise en temps réel.\"",
        "order": 0,
        "finScenario": false,
        "reponses": [
          {
            "id": "721c9dc3-06ce-409c-9913-48dc431e26d6",
            "titre": "Parier sur un Torpilleur",
            "texte": "L'écran affiche maintenant la caméra placée sur le Torpilleur, ainsi que des données sur ses performances. Qu'il envoie ses torpilles au but !\"",
            "libelle": "torpilleur",
            "consequencePossibles": [
              {
                "id": "c885a4c6-3df3-4251-abf6-21209d687bbd",
                "poids": 1,
                "etapeSuivanteId": "6f0f355a-bd8a-4614-b89d-b5972f977fa1"
              },
              {
                "id": "96f727ad-a25e-436d-8eb2-d4181287675e",
                "poids": 2,
                "etapeSuivanteId": "65ce21d1-397e-494e-9421-7d5a56875464"
              }
            ]
          },
          {
            "id": "79293aaa-0e2f-4fd4-bd72-e6301a1b8895",
            "titre": "Parier sur un Chasseur",
            "texte": "L'écran affiche maintenant la caméra placée sur le Chasseur, ainsi que des données sur ses performances. Qu'il abatte tous les vaisseaux !",
            "libelle": "chasseur",
            "consequencePossibles": [
              {
                "id": "43182323-3875-4810-95fd-334d2065290d",
                "poids": 2,
                "etapeSuivanteId": "65ce21d1-397e-494e-9421-7d5a56875464"
              },
              {
                "id": "38141dfa-edf3-421a-9fb8-598dcd5b0225",
                "poids": 1,
                "etapeSuivanteId": "6f0f355a-bd8a-4614-b89d-b5972f977fa1"
              }
            ]
          },
          {
            "id": "1704988a-230a-4028-ba81-7fa587c2419e",
            "titre": "Parier sur un Bombardier",
            "texte": "L'écran affiche maintenant la caméra placée sur le Bombardier\\n, ainsi que des données sur ses performances. Qu'il défonce le Croiseur !",
            "libelle": "bombardier",
            "consequencePossibles": [
              {
                "id": "4d692e4e-1c21-4005-ad6f-aa08f5e81caf",
                "poids": 2,
                "etapeSuivanteId": "65ce21d1-397e-494e-9421-7d5a56875464"
              },
              {
                "id": "79011933-a4f4-469b-95b6-f152876d30c8",
                "poids": 1,
                "etapeSuivanteId": "6f0f355a-bd8a-4614-b89d-b5972f977fa1"
              }
            ]
          }
        ],
        "effets": []
      },
      {
        "id": "973ca79f-43e3-4f72-9ef4-307f101d8c21",
        "titre": "Petits cadeaux entre amis",
        "texte": "Peu rassuré, vous entrez à nouveau dans le casino, le paquet bien dans la poche. Vous sentez dans la nuque le regard inquisiteur du garde du corps. Vous tentez d'adopter le comportement le plus normal possible, priant pour ne pas être fouillé.\n\nAfin de ne pas éveiller les soupçons, vous vous approchez d'une machine à sous, vous y déposez un jeton, vous actionnez le bras. Tandis que la machine émet une petite musique, vous regardez aux alentours pour trouver le bureau du directeur.\n\nVous suez à grosses gouttes. Et si le \"cadeau\" s'actionnait dans votre poche ? Votre regard s'arrête devant un escalier, gardé par deux personnes. Le gars en haut-de-forme avait dit qu'il se trouvait à l'étage, mais n'avait rien indiqué sur la façon d'y aller.",
        "order": 0,
        "finScenario": false,
        "reponses": [
          {
            "id": "da82fe25-2689-469b-aeff-b9c353879622",
            "titre": "Parlementer avec les gardes",
            "texte": "Vous vous approchez des gardes, tout en préparant soigneusement les mots. Histoire d'éviter que ce ne soit les derniers.\n",
            "libelle": "parler",
            "consequencePossibles": [
              {
                "id": "b2a426fe-9b58-4c94-93e9-a9cf478079c5",
                "poids": 1,
                "etapeSuivanteId": "80b61580-7de8-475c-90ca-70b7313390a5"
              }
            ]
          },
          {
            "id": "95fca241-8d4e-4fbc-b18d-44dcfbaf45df",
            "titre": "Balancer le paquet en haut de l'escalier et fuir",
            "texte": "Vous lancez de toutes vos forces le paquet en haut de l'escalier. Au moment où il atteint la porte, une déflagration assourdissante fait résonner la salle. Il serait temps de fuir, n'est-ce pas ?",
            "libelle": "lancer",
            "consequencePossibles": [
              {
                "id": "16aab63e-270e-4a1a-8cf8-f2e2b55386cc",
                "poids": 1,
                "etapeSuivanteId": "c143785d-100a-4ce2-95ed-52a3d33293cf"
              }
            ]
          }
        ],
        "effets": []
      },
      {
        "id": "03776989-5a1c-4536-a321-1b50fe9926eb",
        "titre": "J'ai pas d'essence",
        "texte": "De retour à la pompe à carburant, vous mettez votre maigre butin dans la fente, et la pompe sort un peu d'essence que vous mettez dans le réservoir du vaisseau.\n\nMalheureusement, il y a beaucoup trop peu d'essence. S'il est possible de sortir du système planétaire, il n'est même pas sûr que vous puissiez rejoindre une autre planète pour faire le plein. Une idée germe dans votre esprit : Trafiquer le carburateur et retirer le Filtre Protostatique du Générateur, puis détourner le surplus d'énergie obtenu vers les réacteurs. La distance que pourra parcourir votre vaisseau sera suffisante pour rejoindre un autre système civilisé... si le vaisseau tient jusque là.\n\nTandis que vous réfléchissez au problème, un autochtone vient vers vous, un grand sourire aux lèvres.\n\n\"Mon ami, vous voulez gagner de l'essence ?\"\n\nVous acquiescez prudemment. La personne venue vous aborder est bien habillée, un haut-de-forme sur la tête, des gants sur chacune des trois tentacules. 2 gardes du corps le suivent.\n\n\"Parfait, mon ami, parfait. Nous allons nous occuper de ça. Je vous demande juste un service : pourriez-vous déposer ce paquet chez mon ami directeur du Palais Royal ? (Il montre un petit paquet que tenait caché dans une poche l'un de ses gardes du corps) J'aimerais le faire moi-même, mais votre tête inspire confiance. Je suis sûr que vous êtes la personne de la situation\"\n\nIl jette un coup d’œil rapide autour de lui, et se penche vers vous en parlant à voix basse : \n\n\"Entre nous, vous pouvez déposer ce cadeau juste à coté du bureau de mon ami, ou juste au dessus, ça n'a aucune importance. Veillez simplement à ce qu'il soit présent. Et je vous conseillerai de ne pas traîner en politesse...\"",
        "order": 0,
        "finScenario": false,
        "reponses": [
          {
            "id": "db9ba07d-4a0c-40a9-a2b0-8afd54ae94f0",
            "titre": "Refuser et bricoler le vaisseau pour partir d'ici",
            "texte": "\"Non, sans façon, merci. Je peux partir sans votre aide. Bon courage avec votre ami !\"",
            "libelle": "partir",
            "consequencePossibles": [
              {
                "id": "61971140-e42a-451e-9534-7942e09c88e7",
                "poids": 1,
                "etapeSuivanteId": "538932b9-fa6c-450b-8cf3-44c3dd677714"
              }
            ]
          },
          {
            "id": "658442d7-ee00-435a-a325-7602b159564e",
            "titre": "Livrer le \"cadeau\"",
            "texte": "Vous avez une idée assez précise du contenu du \n\"cadeau\". Mais si c'est pour rendre service...",
            "libelle": "livrer",
            "consequencePossibles": [
              {
                "id": "e755a489-045e-478f-abbe-1b4dd189c042",
                "poids": 1,
                "etapeSuivanteId": "973ca79f-43e3-4f72-9ef4-307f101d8c21"
              }
            ]
          }
        ],
        "effets": []
      },
      {
        "id": "514fcfcf-c9e1-4c38-b611-d1cd45f0beae",
        "premiereEtape" : true,
        "titre": "Il faut que je me refasse...",
        "texte": "Occupé à écouter au casque le dernier album des Galacticos Métallos, vous ne remarquez pas tout de suite le signal sonore émis par le radar. C'est à la fin du morceau que vous comprenez qu'une planète, catégorisée comme étant \"à risque modérée\", se trouvait à proximité, une lune gravitant autour d'elle. Malheureusement, le manque de carburant vous contraint à vous poser sur la planète afin de vous ravitailler. Il était temps : encore quinze minutes et vous étiez en panne sèche.\n\nUne fois le vaisseau arrêté devant la pompe à carburant, une chose étrange vous interpelle : vous ne pouvez pas utiliser cotre carte banquaire contenant votre solde de Crédit Galactique, la monnaie commune dans toute la galaxie. À la place, une sorte de monnaie locale est demandée, avec comme instruction : \"En cas de problème, adressez-vous aux agents du \"Palais Royal\"  Intrigué, vous vous déplacez vers le bâtiment le plus proche, doté d'une enseigne brillant intensément.  Le \"Palais Royal\" est immense et, au vu du bruit à l'intérieur, est très animé. vous ouvrez l'immense porte du bâtiment sous l’œil de deux vigiles patibulaires, et pénétrez dedans.\n\nJamais vous n'avez vu un casino aussi extravagant. Tout autour de vous se trouvent des centaines de personnes, de toutes races, affairés devant des cartes, des billes, des machines, des animaux qui se battent, des écrans transmettant une course, des hôtesses aguicheuses, et pour certains, des montagnes de jetons. Malgré la décoration prestigieuse, il vous semble clair que l'endroit est mal famé. \n\nComme il vous semble également clair que ce sont ces jetons de casino qui sont nécessaires à la pompe à carburant. Cependant, il vous faut débourser le peu de monnaie qui est dans votre poche pour en obtenir.",
        "order": 0,
        "finScenario": false,
        "reponses": [
          {
            "id": "843f942a-d8a5-4ac6-b6f7-3060e4156872",
            "titre": "Échanger le peu d'argent qu'il vous reste contre quelques jetons et prendre de l'essence",
            "texte": "\"Ce sera pas suffisant pour aller loin... mais je préfère ça plutôt que rester une minute de plus dans cet endroit\"",
            "libelle": "partir",
            "consequencePossibles": [
              {
                "id": "f55e6a17-7cd4-4e87-b607-5f1a94fc2a0c",
                "poids": 1,
                "etapeSuivanteId": "03776989-5a1c-4536-a321-1b50fe9926eb"
              }
            ]
          },
          {
            "id": "bc982138-9b95-4c0c-bf18-748bbc7f4d2f",
            "titre": "Rejoindre une table et commencer à jouer",
            "texte": "Vous échangez le peu d'argent qu'il vous restait contre quelques jetons (à peine assez pour remplir un petit jerrycan d'essence). Vous vous asseyez à une table, en espérant un miracle.",
            "libelle": "jouer",
            "consequencePossibles": [
              {
                "id": "b498d6f8-674e-42a2-a2f1-04d1334b590e",
                "poids": 1,
                "etapeSuivanteId": "8da6b623-41ba-45f1-a0b9-eabcdb81aea2"
              }
            ]
          }
        ],
        "effets": []
      },
      {
        "id": "6f0f355a-bd8a-4614-b89d-b5972f977fa1",
        "titre": "Allez, tire !",
        "texte": "Un immense tir de laser provenant du Croiseur frôle votre vaisseau et en abat un autre derrière vous. Le vaisseau se fait prendre en chasse par un chasseur, qui périt dans une explosion de roquette. Vous entendez au bout de la table plusieurs cris de rage. La moitié des parieurs sont partis de la table. Tout se passe bien pour le moment.\n\nUn missile d'une taille inquiétante vous prend en chasse. Le vaisseau fait des embardées, en essayant de le perdre, malheureusement sans succès. Le vaisseau se dirige alors sur le Croiseur ennemi et passe entre les tourelles. Le missile vous suit toujours, et gagne même du terrain. C'est alors que le vaisseau change d'assiette et passe au ras des antennes de communication. Le missile s'écrase dessus, provoquant une immense explosion.\n\nLe cri de joie que vous avez poussé alors vous attire le regard mauvais de plusieurs parieurs malchanceux. Vous venez de constater que ce coup de maître vous a donné la première place au classement. La bataille est terminée. Vous avez gagné le jackpot.\n\nVous profitez de la fortune gagnée pour offrir un généreux pourboire au casino, et pour consolider votre vaisseau.\n\nSans oublier bien sûr de faire le plein !",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "f0d00c9f-ad7d-4a8b-ab1a-0386d2bf10ae",
            "quantite": 4,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "b130e874-d843-4578-821e-ac100b045e46",
              "code": "pv",
              "libelle": "Points de vie",
              "description": "Points de vie du joueur"
            }
          },
          {
            "id": "83e0bb59-1e4a-41cc-a587-491979086b41",
            "quantite": 1,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "9b139315-cc81-41af-9f9b-e18b53a9b14a",
              "code": "pir",
              "libelle": "pirates",
              "description": "Pirates présents dans le monde"
            }
          }
        ]
      },
      {
        "id": "65ce21d1-397e-494e-9421-7d5a56875464",
        "titre": "Tire ! Mais Tire !",
        "texte": "Les yeux fixés sur le petit écran, vous voyez votre vaisseau abattre un ennemi de plus. Sur le côté, le compteur de gain gagne un chiffre supplémentaire. Votre cœur bat violemment dans votre poitrine. Un nouveau tir sur le croiseur,  et vous avez quintuplé votre mise.\n\nUne roquette prend pour cible le vaisseau, qui se précipite au milieu d'autres vaisseaux, alliés comme ennemis. Vous voyez la roquette toucher une autre cible, ce qui génère une immense explosion, mettant hors service des dizaines de vaisseaux. Vous entendez tous autour de la table des jurons exotiques.\n\nVous aimeriez bien que pilote du vaisseau gagne en prudence, car la somme accumulée jusqu'à maintenant vous permettrait largement de faire le plein de carburant. Cependant, vous le voyez foncer vers les antennes du Croiseur, et de commencer à tirer sur elles. Une tourelle commence à se tourner en votre direction.\n\nVous voyez un éclair blanc, puis l'écran devient noir. Le vaisseau s'est fait abattre.\n\nDe rage, vous quittez la table de jeu, et allez au bar réclamer un verre d'alcool fort. Pendant que le barman prépare votre verre d'un air las, vous sentez quelqu'un tapoter sur votre épaule.\n\nUne femme, l'air passablement éméché, vous sourit de toutes ses dents. Un bref coup d’œil vous permet de deviner qu'elle fait partie de la Chevalerie. Son haleine vous donne la nausée.\n\n\"Tu sais, ton poulain là... quand il a fait exploser tous les vaisseaux en semant la roquette, il m'a vraiment aidé pour le coup. Grâce à lui, le putain de chasseur qui me collait au basque a crevé, et mon poulain a pu buter le Croisii... Le Croiseur, voilà, oui.\"\n\nTout en parlant, elle claque des doigts en essayant d'attirer l'attention du barman, sans succès.\n\n\"Je disais quoi déjà... Ouais, le Croiseur. Alors tu sais quoi ? Je te paie ce verre, et t'as gagné un petit pourboire ! Naan, naan, refuse pas ! Eh, barman ! Ah, quand même, c'est pas dommage ! La conso de mon nouveau pote est pour moi ! À la santé des roquettes !\"\n\nEt elle vous balance (dans l’œil) un jeton de valeur assez élevé pour remplir le réservoir de votre vaisseau, du moins suffisamment pour partir de cette planète. Mais avant ça, il semblerait que votre nouvelle amie veuille débriefer avec vous la \"partie\" que vous venez de jouer. Bon courage.",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "0d79ebe6-9a16-4e5d-9fa7-7af7d65117e7",
            "quantite": 1,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "9b139315-cc81-41af-9f9b-e18b53a9b14a",
              "code": "pir",
              "libelle": "pirates",
              "description": "Pirates présents dans le monde"
            }
          },
          {
            "id": "655d5bc4-e592-4bbe-ac15-08e0477d782e",
            "quantite": 1,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "6107d7c1-e235-400e-8e2b-0eaf2789bc09",
              "code": "estChe",
              "libelle": "Estime de la Chevalerie",
              "description": "Estime de l'empire de la Chevalerie envers ce joueur"
            }
          }
        ]
      },
      {
        "id": "538932b9-fa6c-450b-8cf3-44c3dd677714",
        "titre": "Chaque goutte de carburant compte",
        "texte": "Vous passez un peu plus d'une heure à modifier le carburateur de votre vaisseau. Quelques passants vous jettent un regard furtif, mais personne ne s'approche de vous. Tant mieux.\n\nUne fois les modifications terminées, vous vous installez dans votre cockpit, puis vous regardez le plan. Les recherches que vous effectuez indiquent un autre distributeur se trouvant sur la lune de votre planète. Et apparemment, cette fois-ci, le Crédit Galactique serait accepté.\n\nLe prix y est trois fois plus élevé qu'habituellement, mais vous n'avez pas le choix.\n\nVous démarrez les moteurs. Le doux son électronique accompagnant habituellement le décollage est remplacé par des bruits électriques inquiétants. Le voyant de surtension s'allume aussitôt. La jauge de carburant est désespérément basse. Vous sortez de l'atmosphère à destination de la lune. Le temps du trajet est estimé à une heure.\n\nLe vaisseau tremble de part en part. Un voyant jaune s'allume, puis un rouge. une alarme retentit. Il n'y a presque plus de carburant.  Quarante-cinq minutes se sont écoulés après votre décollage. La lune est toute proche. Vous entrez dans son champ gravitationnel. Heureusement, elle ne possède pas d'atmosphère. Le vaisseau ne l'aurait peut-être pas supporté. La pompe se trouve plus qu'à une centaine de kilomètres en-dessous du vaisseau.\n\nPuis, d'un coup, tous les voyants s'éteignent. L'alarme s'arrête. Le vaisseau cesse de trembler. Le dernier litre de carburant a été consommé.\n\nLe vaisseau commence à s'écraser lentement vers la surface de la lune. Par chance, la gravité y est tellement faible pour que la chute soit extrêmement douce. 10 minutes plus tard, après une très forte secousse, vous voilà devant un garage, et une pompe à essence. \n\nVous sortez de votre vaisseau, encore secoué, et vous tombez sur le pompiste, qui vous regarde avec un sourire en coin.\n\n\"Le plein ?\"",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "569dcb6b-367c-45f7-b913-809c11783a2f",
            "quantite": -2,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "f906ac5f-ca82-4574-8682-79862d66e3e3",
              "code": "infFam",
              "libelle": "Influence de la Famille",
              "description": "Influence des Aliens sur le monde"
            }
          },
          {
            "id": "f19f0c53-8586-4c01-aae7-0f5da0b3b3cf",
            "quantite": 3,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "9b139315-cc81-41af-9f9b-e18b53a9b14a",
              "code": "pir",
              "libelle": "pirates",
              "description": "Pirates présents dans le monde"
            }
          },
          {
            "id": "d67ab228-91d6-4545-aac5-9edf7e65bf55",
            "quantite": -1,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "05a81342-b2ca-40f8-ae6e-3d381a2ba4bb",
              "code": "estFam",
              "libelle": "Estime de la Famille",
              "description": "Estime de l'empire de la Famille envers ce joueur"
            }
          },
          {
            "id": "ad379a81-fd4b-4395-b18f-3859383b1924",
            "quantite": 2,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "b130e874-d843-4578-821e-ac100b045e46",
              "code": "pv",
              "libelle": "Points de vie",
              "description": "Points de vie du joueur"
            }
          }
        ]
      },
      {
        "id": "80b61580-7de8-475c-90ca-70b7313390a5",
        "titre": "J'ai un cadeau pour le directeur !",
        "texte": "Vous saluez les gardes, et vous faîtes savoir que le Directeur vous a demandé d'apporter au plus vite ce paquet que vous leur montrez. Les gardes vous regardent d'un air suspicieux.\n\nVous prenez une inspiration, et vous tentez un bluff en leur faisant comprendre qu'il s'agit de quelque chose très attendu par le Directeur, et qu'il a promis une récompense à celui qui lui rapportera son objet. Les gardes se toisent, et vous pointent avec leur arme.\n\n\"On ne dérange pas Madame le Directeur, quel qu'en soit le motif. Veuillez nous remettre votre objet et partez tout de suite. Nous ne manquerons pas de faire savoir à Madame que vous êtes passé donner ceci. Quel nom doit-on rapporter ?\"\n\nVous bredouillez un nom fictif, mais les gardes avaient déjà commencés à grimper les escaliers. Vous vous dirigez vers la sortie, en marchant le plus rapidement et le plus naturellement possible.\n\nAu bout de trente secondes après votre sortie du Palais Royal, une explosion assourdissante se fait entendre derrière vous. Vous continuez votre route en pressant le pas jusqu'à arriver à votre vaisseau. Vous grimpez les marches et vous allumez les moteurs à toute vitesse. Le réservoir est plein, comme promis.\n\nDes cris commencent à se faire entendre dehors. Le vaisseau commence à décoller. En quelques minutes, vous vous mettez hors de l'attraction de la planète.\n\nVous recevez alors un message anonyme  sur votre terminal. \"Il semblerait que mon ami ait survécu à cet odieux attentat, l'explosion ayant eu lieu dans la salle de pause des gardes. Toutefois, il y aura des séquelles. Seul l'avenir nous dira comment il s'en remettra. Merci pour ta coopération, mon ami.\". \n\nVous préférez tout de même fouiller votre vaisseau, histoire d'être sûr qu'un autre cadeau ne se trouve pas à bord.",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "96588737-bd8b-4fba-9647-f57b591e0708",
            "quantite": -1,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "9b139315-cc81-41af-9f9b-e18b53a9b14a",
              "code": "pir",
              "libelle": "pirates",
              "description": "Pirates présents dans le monde"
            }
          },
          {
            "id": "6c554892-86f9-45cb-b68a-9f6eee512ca0",
            "quantite": 1,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "05a81342-b2ca-40f8-ae6e-3d381a2ba4bb",
              "code": "estFam",
              "libelle": "Estime de la Famille",
              "description": "Estime de l'empire de la Famille envers ce joueur"
            }
          },
          {
            "id": "f7da012f-11da-41ec-ab49-d56ec52c10c7",
            "quantite": 1,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "b130e874-d843-4578-821e-ac100b045e46",
              "code": "pv",
              "libelle": "Points de vie",
              "description": "Points de vie du joueur"
            }
          },
          {
            "id": "26c6e792-a020-40cb-be2d-f8f37da93012",
            "quantite": 2,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "f906ac5f-ca82-4574-8682-79862d66e3e3",
              "code": "infFam",
              "libelle": "Influence de la Famille",
              "description": "Influence des Aliens sur le monde"
            }
          }
        ]
      },
      {
        "id": "c143785d-100a-4ce2-95ed-52a3d33293cf",
        "titre": "Explosion",
        "texte": "Vous prenez vos jambes à votre cou avant même que quiconque ait bougé. Au moment où vous franchissez la porte, vous commencez à entendre de manière confuse du bruit derrière vous. Des gémissements. Des hurlements.\n\nEt des tirs.\n\nVous sprintez vers votre vaisseau, en priant que le plein ait bien été fait. Lorsque vous voyez votre vaisseau, vous grimpez ses marches quatre à quatre, et vous vous dépêchez de fermer le hublot. Vous allumez les moteurs à toute vitesse. Le réservoir est plein, comme promis.\n\nDes tirs atteignent la coque du vaisseau. Vous commencez à décoller. Une alarme se fait entendre : un tir a traversé un écran du cockpit. Plus vous vous élevez, moins vous entendez de chocs. le plus dur est passé.\nLorsque vous quittez enfin l’atmosphère, le cœur battant à toute allure, vous remarquez enfin un petit mot laissé sur le cockpit. \"Tu m'as rendu un grand service, mon ami. Sois-en remercié\".\n\nVous préférez tout de même fouiller votre vaisseau, histoire d'être sûr qu'un autre cadeau ne se trouve pas à bord.",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "cd29cfee-9362-457c-83ea-48e04dd749de",
            "quantite": -3,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "b130e874-d843-4578-821e-ac100b045e46",
              "code": "pv",
              "libelle": "Points de vie",
              "description": "Points de vie du joueur"
            }
          },
          {
            "id": "0a06c0c2-742b-4a95-92b3-4ae74e89ca2b",
            "quantite": 2,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "05a81342-b2ca-40f8-ae6e-3d381a2ba4bb",
              "code": "estFam",
              "libelle": "Estime de la Famille",
              "description": "Estime de l'empire de la Famille envers ce joueur"
            }
          },
          {
            "id": "75c9401a-5256-4fd3-a8f4-68f832ef2c88",
            "quantite": -3,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "9b139315-cc81-41af-9f9b-e18b53a9b14a",
              "code": "pir",
              "libelle": "pirates",
              "description": "Pirates présents dans le monde"
            }
          },
          {
            "id": "228c613a-c0a3-4943-804c-2b0e85914a4c",
            "quantite": 3,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "f906ac5f-ca82-4574-8682-79862d66e3e3",
              "code": "infFam",
              "libelle": "Influence de la Famille",
              "description": "Influence des Aliens sur le monde"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "ebc5f0a9-a9d3-4b2b-a47c-6864ada161d7",
    "titre": "Panne de carburant",
    "actif": false,
    "etapes": [
      {
        "id": "c3c25b79-9aab-4513-a88d-eb10f918b438",
         "premiereEtape" : true,
        "titre": "Panne de carburant",
        "texte": "Alors que vous étiez conformablement installé dans le cockpit à lire les cartes galactiques, un signal retentit. Un coup d'oeil à votre tableau de bord vous permet de constater un problème inquiétant : la quantité de carburant restante dans le reservoir est très faible. L'ordinateur de bord annonce une autonomie ne dépassant pas la poignée d'heures.\n\nL'ordinateur annonce également qu'une station de carburant se trouve dans les parages, mais malheureusement peut-être un peu lointaine. Cependant, il vous est possible d'activer le mode \"économie\" de votre vaisseau. Cela aura pour effet d'optimiser la consommation d'essence, mais au prix d'une désactivation de plusieurs fonctions du vaisseau, notamment la protection contre les débris cosmiques ou la musique à bord.",
        "order": 0,
        "finScenario": false,
        "reponses": [
          {
            "id": "02f13547-ada1-48f5-8d4d-d0ce13fc0662",
            "titre": "Ne pas activer le mode économie, je peux le faire",
            "texte": "Allez, ça peut le faire, mon vaisseau en a connu d'autres, pas vrai ?",
            "libelle": "consommation",
            "consequencePossibles": [
              {
                "id": "7edafacf-9c68-455a-87d7-d8cfe026e391",
                "poids": 1,
                "etapeSuivanteId": "fa0df3aa-cd7f-4c13-9a0f-b28a7748e2d1"
              }
            ]
          },
          {
            "id": "e3811652-8728-4b3d-8faf-fd4802e2d967",
            "titre": "Activer le mode économie d'énergie",
            "texte": "Ne prenons aucun risque. Tant pis pour le confort, pourvu que j'arrive entier. Et j'aurai l'occasion d'écouter le dernier disque \"Hyperspace\" une autre fois.",
            "libelle": "economie",
            "consequencePossibles": [
              {
                "id": "bfa4717b-086e-48f6-872c-26a8a1b2c46d",
                "poids": 1,
                "etapeSuivanteId": "ee278758-610f-456f-b5f6-c5e3fdd29006"
              }
            ]
          }
        ],
        "effets": []
      },
      {
        "id": "fa0df3aa-cd7f-4c13-9a0f-b28a7748e2d1",
        "titre": "La panne sèche",
        "texte": "Il était temps. Le moteur commence à tousser à moins d'un kilomètre de la station, et vous calez juste devant l'enseigne de la station de carburant. Soudain, un piéton Alien surgit devant vous, et sans puissance dans les réacteurs, il vous est impossible de l'esquiver. \n\nLe piéton s'en est sorti avec une peur bleue, mais commence à vous insulter bruyamment. Vous bredouillez des excuses pendant que vous faites le plein, et vous décollez sous le regard amusé des curieux, et furieux de votre victime.\"",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "d38881ea-ded6-4968-a927-9d1172e2d435",
            "quantite": -2,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "be84059b-386c-4844-80de-41d15c801ea2",
              "code": "estAli",
              "libelle": "Estime des Aliens",
              "description": "Estime de l'empire des Aliens envers ce joueur"
            }
          }
        ]
      },
      {
        "id": "ee278758-610f-456f-b5f6-c5e3fdd29006",
        "titre": "Je deteste la classe éco",
        "texte": "Après plusieurs heures voyageant dans des conditions particulièrement pénibles, avec un cockpit sous-éclairé et les parois qui tremblent, vous finissez enfin par arriver à la station de carburant.\n\nVous faites le plein, puis vous examinez le vaisseau. Quelques impacts sont visibles sur la coque, et n'étaient clairement pas présent auparavant. Espérons que ça n'aura aucun impact pour la suite des événements...",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "83383110-a3a3-49cf-8703-941ce2e4303e",
            "quantite": -2,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "b130e874-d843-4578-821e-ac100b045e46",
              "code": "pv",
              "libelle": "Points de vie",
              "description": "Points de vie du joueur"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "b682bcb2-c276-4e1f-bb3a-11b779f3a651",
    "titre": "La base mystérieuse",
    "actif": false,
    "etapes": [
      {
        "id": "63c9706d-d091-478e-90be-126c9c104e6d",
        "premiereEtape" : true,
        "titre": "\"Ce n'est pas une lune...\"",
        "texte": "Alors que vous étiez convaincu d'être dans une zone totalement vierge, les senseurs de votre vaisseau détectent la présence d'une énorme structure métallique à quelques parsecs. En avançant vers la position indiquée, vous apercevez les structures métalliques d'une immense sphère en construction, bâtie par des milliers de robots Mégalo. Sa taille atteignait celle d'une planète naine. \n\nLe voyant indiquant un début de communication s'allume. Une voix robotique se fait entendre des haut-parleurs. \n\n\"Visiteur, vous venez d'entrer dans le chantier de la Spatio Base Intergalactique Cosmique MultiProtonique, conçue et réalisée par notre maître, le Grand Suzerain Intergalactique Robotique. Veuillez décliner l'objet de votre visite.",
        "order": 0,
        "finScenario": false,
        "reponses": [
          {
            "id": "3d0142f8-8e77-4643-99ae-9039b291f584",
            "titre": "Demander de l'essence",
            "texte": "\"Auriez-vous du carburant ? J'allais tomber en panne, au milieu de nulle part, suite à des soucis avec mon module de triangulation...\"",
            "libelle": "essence",
            "consequencePossibles": [
              {
                "id": "4ccc3525-c500-4554-add1-2a938b5c5606",
                "poids": 1,
                "etapeSuivanteId": "919fda11-2771-46eb-8202-0449427ce0db"
              }
            ]
          },
          {
            "id": "1f092760-f00a-4730-b3eb-fbfdf0d0ef5b",
            "titre": "Accepter la visite",
            "texte": "\"Je serais curieux de pouvoir entrer dans un engin pareil. Vous faites les visites ?\"",
            "libelle": "visite",
            "consequencePossibles": [
              {
                "id": "04e573a2-2d81-481f-a251-5e8430ad8ed6",
                "poids": 1,
                "etapeSuivanteId": "bbaa1af9-5619-4b13-b107-e848ad0b0df0"
              }
            ]
          }
        ],
        "effets": [
          {
            "id": "1e157669-a062-42af-a519-fe846f042889",
            "quantite": 3,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "f862e81a-37ba-4f46-9868-719b5f1d59e2",
              "code": "infMeg",
              "libelle": "Influence du Mégalo",
              "description": "Influence du Mégalo sur le monde"
            }
          }
        ]
      },
      {
        "id": "bbaa1af9-5619-4b13-b107-e848ad0b0df0",
        "titre": "La visite",
        "texte": "Après vous être posé dans le hangar, deux robots-guides vous présentent avec entrain la base pendant plus d'une heure, du système de répartition d'énergie à l'armement. Sa puissance est sans nulle doute colossale, voire démesurée. Son énorme poids le contraint à une vitesse de déplacement faible, mais sa portée est telle que la mort pourrait survenir à quiconque se trouve dans les parages, avant même d'avoir pu détecter cette base.\n\nTout, dans son aspect, était effrayant.\n\nAprès avoir remercié vos deux guides (en oubliant toutefois le pourboire), vous montez à bord de votre vaisseau et vous sortez de la zone.",
        "order": 0,
        "finScenario": false,
        "reponses": [
          {
            "id": "55cede47-159d-4322-a576-0b5a60233421",
            "titre": "Prévenir les autorités",
            "texte": "Je dois prévenir le système habité le plus proche. Cet engin risque de semer la destruction où qu'elle aille.",
            "libelle": "prevenir",
            "consequencePossibles": [
              {
                "id": "cb8fc7ca-1411-448b-a147-b912550521b4",
                "poids": 1,
                "etapeSuivanteId": "bd8fb31e-b75a-40ec-bd35-dae22c0a1461"
              }
            ]
          },
          {
            "id": "285b8428-b9e6-48dd-b520-6636f9221800",
            "titre": "S'éloigner d'ici",
            "texte": "Belle visite, je n'ai pas perdu mon temps. Mais il est temps de quitter la zone. Loin.\n",
            "libelle": "partir",
            "consequencePossibles": [
              {
                "id": "20566163-f484-4e63-a0e2-8bf2160fb398",
                "poids": 1,
                "etapeSuivanteId": "3df6da28-f33b-4b48-8f0c-7c6b3e1fe0c3"
              }
            ]
          }
        ],
        "effets": []
      },
      {
        "id": "919fda11-2771-46eb-8202-0449427ce0db",
        "titre": "En même temps, notre vaisseau en avait bien besoin",
        "texte": "Quatre robots s'affairent à remplir le réservoir de carburant (qui était en réalité à moitié plein). Les robots se montrent serviables et enclins à la conversation (en particulier sur les sujets concernant Le Mégalo). Vous repartez de la station avec un vaisseau mis à neuf. Les robots-Mégalo ont même pensé à mettre une figurine du Mégalo accroché au rétroviseur...",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "dca75167-71d6-4c98-8bec-4a23bee90288",
            "quantite": 3,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "f862e81a-37ba-4f46-9868-719b5f1d59e2",
              "code": "infMeg",
              "libelle": "Influence du Mégalo",
              "description": "Influence du Mégalo sur le monde"
            }
          },
          {
            "id": "5f3a3f37-1283-41e6-8c13-443b7930bf06",
            "quantite": 3,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "b130e874-d843-4578-821e-ac100b045e46",
              "code": "pv",
              "libelle": "Points de vie",
              "description": "Points de vie du joueur"
            }
          }
        ]
      },
      {
        "id": "bd8fb31e-b75a-40ec-bd35-dae22c0a1461",
        "titre": "Prévenir les autorités",
        "texte": "Vous vous rendez à un avant-poste commercial appartenant à la Chevalerie après une dizaine d'heure de trajet. Vous contactez le service de sécurité du système et vous parvenez à vous faire communiquer les informations concernant la mystérieuse station. Les agents vous gratifient d'un sobre \"Merci pour ces informations. Nous allons prévenir les autorités compétentes du danger de ce secteur. Fin de la transmission\". Plus qu'à espérer que les autorités compétentes en questions sauront quoi faire.",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "32c4dd98-9e7a-4aec-85ee-09aee7be6e3b",
            "quantite": -1,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "f862e81a-37ba-4f46-9868-719b5f1d59e2",
              "code": "infMeg",
              "libelle": "Influence du Mégalo",
              "description": "Influence du Mégalo sur le monde"
            }
          },
          {
            "id": "b8cbbdf0-81ee-445f-8de9-269a6f9670a4",
            "quantite": 2,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "cf817cfa-4823-4024-8b53-4cb6f97bdd5b",
              "code": "infChe",
              "libelle": "Influence de la Chevalerie",
              "description": "Influence de la Chevalerie sur le monde"
            }
          }
        ]
      },
      {
        "id": "3df6da28-f33b-4b48-8f0c-7c6b3e1fe0c3",
        "titre": "On s'éloigne gentiment",
        "texte": "Il vous a fallu près d'une heure de trajet à pleine vitesse pour que cette immense station ne soit plus visible par vos radars. Mais vous savez pertinemment que la station est toujours parfaitement capable de vous localiser à cette distance. Raison de plus de s'éloigner d'ici le plus rapidement possible. Qu'il choisisse une autre première victime.",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "04b05ef8-272c-4b9b-9e69-9eb4e4dad598",
            "quantite": 3,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "f862e81a-37ba-4f46-9868-719b5f1d59e2",
              "code": "infMeg",
              "libelle": "Influence du Mégalo",
              "description": "Influence du Mégalo sur le monde"
            }
          },
          {
            "id": "a49bb09e-7780-4aef-982c-cf9434b39b8a",
            "quantite": -2,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "cf817cfa-4823-4024-8b53-4cb6f97bdd5b",
              "code": "infChe",
              "libelle": "Influence de la Chevalerie",
              "description": "Influence de la Chevalerie sur le monde"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "6a721320-7444-4195-a363-f04b23a08b02",
    "titre": "Sous l'océan...",
    "actif": false,
    "etapes": [
      {
        "id": "337c397b-b67c-47a8-858c-629daf2588e9",
        "premiereEtape" : true,
        "titre": "Sous l'océan...",
        "texte": "Tandis que vous essayiez vainement de vous repérer dans l'immensité de la galaxie, le son des senseurs de votre vaisseau se fait entendre : une petite planète,  au climat tempéré et à l'atmosphère raisonnablement respirable (du moins, avec un masque adéquat) se trouve à quelques parsecs de votre position. L'envie de vous dégourdir les jambes l'emporte sur le reste, et vous vous dirigez sur la planète.\n\nEn vous en approchant, vous constatez qu'elle est constituée d'une étendue d'eau violette (ou du moins, un liquide violet), parsemée d'une multitude d'îles. Vous atterrissez sur l'une d'elles, vous sortez du vaisseau, et vous vous approchez de l'océan pour l'examiner. ll s'agit bien d'eau, d'une extrême limpidité. En examinant les profondeurs visibles, vous apercevez des poissons exotiques, divers mollusques, et, tout au fond, une étendue de plantes aquatiques, émettant la fameuse lumière violette.\\n\\nVous sortez votre matériel de pêche, commencez à mettre le matériel dans la mer, quand vous remarquez un léger mouvement au fond de l'eau. Quand vous vous penchez pour regarder de plus près, vous voyez les plantes monter lentement vers la surface, qu'ils atteindront certainement dans moins d'une minute.\n\nEt c'est à ce moment que vous remarquez qu'il ne s'agissait pas de plantes, mais bien d'arbres. Des Ambrés.\n\nEt l'eau est passée d'une couleur rougeâtre.",
        "order": 0,
        "finScenario": false,
        "reponses": [
          {
            "id": "b23f5835-b0e2-44b3-81a8-4a5dbbe29bec",
            "titre": "Prendre la fuite",
            "texte": "Au diable le poisson, si je reste une seconde de plus, je suis mort ! Au vaisseau !",
            "libelle": "fuir",
            "consequencePossibles": [
              {
                "id": "057303fd-3522-4096-b576-ff60e1bfeafd",
                "poids": 1,
                "etapeSuivanteId": "2e878a09-b5e8-4260-a442-0ef248c39fc2"
              }
            ]
          },
          {
            "id": "bee95cd6-3baa-457d-8117-fbcafc40b63e",
            "titre": "Parlementer avec les Ambrés",
            "texte": "Les Ambrés sont intelligents et télépathes. Je suis sûr qu'on trouvera un terrain d'entente... Au pire, ce ne sera pas le pire endroit pour mourir...",
            "libelle": "parler",
            "consequencePossibles": [
              {
                "id": "4374bcc8-59d0-429d-ba3f-cd8d0d5d374a",
                "poids": 1,
                "etapeSuivanteId": "6069726f-71ef-4425-9b01-58df8117a510"
              }
            ]
          }
        ],
        "effets": []
      },
      {
        "id": "2e878a09-b5e8-4260-a442-0ef248c39fc2",
        "titre": "Plus jamais d'eau",
        "texte": "Vous foncez dans votre vaisseau et vous programmez un décollage d'urgence. Votre appareil prévient que la manœuvre prendra un peu plus longtemps que prévu, à cause de la gravité inhabituelle de la planète, et démarre une petite musique d'ambiance que vous arrêtez immédiatement. \n\nAu moment où l'écran se met au vert, signe que le décollage va commencer, l'eau bouillonne et des milliers d'Ambrés commencent à émerger à perte de vues. Vous commencez à vous élever, le cœur battant la chamade.\n\nAu moment où vous atteignez l'atmosphère, un dernier coup d’œil au rétroviseur vous permet de constater que l'eau est redevenue de couleur violette.",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "77374c1f-e60f-49d0-a80b-dc69f0c783eb",
            "quantite": -1,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "9c86f4a1-df16-4877-9f80-267d5c1009b6",
              "code": "infAmb",
              "libelle": "Influence des Ambrés",
              "description": "Influence des Ambrés sur le monde"
            }
          },
          {
            "id": "06a14e1a-d3b6-41fd-95e8-69cd192ac1ac",
            "quantite": -3,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "4f6b3bfa-9d91-437b-b73a-cd5ce1bc366e",
              "code": "estAmb",
              "libelle": "Estime des Ambrés",
              "description": "Estime de l'empire des ambrés envers ce joueur"
            }
          }
        ]
      },
      {
        "id": "6069726f-71ef-4425-9b01-58df8117a510",
        "titre": "Parlementer avec un Ambré, tout un boulot",
        "texte": "Placé au milieu de votre minuscule îlot, vous voyez l'eau se met à bouillir et des milliers d'Ambrés émergent à perte de vue. Vous hésitez toujours sur la phrase à prononcer (\"Je viens en paix\", \"Quelle belle planète vous avez là\", \"Pitié, laissez-moi en vie\") lorsque vous entendez dans votre tête une multitude de voix identiques, graves, lentes.\n\n\" Votre vaisseau est équipe d'un Régulateur de Faisceau Quantique  qui serait grandement utile à notre nation. Si vous acceptez de nous la céder, nous pourrions la remplacer par une pièce équivalente de notre fabrication, et nous vous accorderons le droit de quitter nos terres.\"\n\nComme s'il y avait le choix... Vous bredouillez un \"Faites donc\", et vous regardez ébahi les Ambrés les plus proches s'affairer immédiatement au désassemblage du vaisseau. \n\nLorsque le crépuscule arriva, deux heures plus tard, les Ambrés s'éloignent du vaisseau et sans un mot, replongent dans l'eau. Elle redevient violette quelques minutes plus tard. Vous montez dans votre vaisseau, et c'est avec un peu d'appréhension que vous décollez. Le vaisseau a l'air tout à fait fonctionnel, mais semble avoir un peu plus d'inertie.\n\nLorsque vous atteignez l'atmosphère de la planète, un millier de \"Merci\" résonnent à l'unisson dans votre tête.",
        "order": 0,
        "finScenario": true,
        "reponses": [],
        "effets": [
          {
            "id": "af46f2bb-9064-4bac-ae3c-d3aae6c69091",
            "quantite": -1,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "b130e874-d843-4578-821e-ac100b045e46",
              "code": "pv",
              "libelle": "Points de vie",
              "description": "Points de vie du joueur"
            }
          },
          {
            "id": "5f515991-91a9-4f64-89e7-fb4be83e8ba0",
            "quantite": 3,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "4f6b3bfa-9d91-437b-b73a-cd5ce1bc366e",
              "code": "estAmb",
              "libelle": "Estime des Ambrés",
              "description": "Estime de l'empire des ambrés envers ce joueur"
            }
          },
          {
            "id": "32036871-248a-4494-b341-0a6948e0e124",
            "quantite": 2,
            "texte": '',
            "type": "JOUEUR",
            "unite": {
              "id": "9c86f4a1-df16-4877-9f80-267d5c1009b6",
              "code": "infAmb",
              "libelle": "Influence des Ambrés",
              "description": "Influence des Ambrés sur le monde"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "5d57145b-cf7f-4fa3-934f-0e2947e648e8",
    "titre": "Une planète luxuriante",
    "actif": false,
    "etapes": [
      {
        "id": "786becf4-05f8-4c4e-9630-32060d31fcf6",
        "premiereEtape" : true,
        "titre": "Un étrange rêve",
        "texte": "Vous vous réveillez à la suite d’un étrange rêve. Tout était si parfait, une nature luxuriante, un paysage calme, une fontaine d’eau claire et limpide. [...] Cela vous a donnée l’eau à la bouche et vous rappelle que vos stock en eau risquent d'être insuffisants si vous souhaitez continuer []\n\n",
        "order": 0,
        "finScenario": false,
        "reponses": [
          {
            "id": "b773d9bb-d952-426b-bc61-cb7e1a2b3283",
            "titre": "on se pose sur la planète",
            "texte": "On se pose dans une clairière au milieu de la végétation. Tout est magnifique. On entend (ou bien scanners du vaisseau perçoivent de l’eau dans les environs, ou les deux) une cascade pas loin, peut être celle vue en rêve ? Continuer ?\n",
            "libelle": "atterir",
            "consequencePossibles": [
              {
                "id": "224f40d9-28e9-4cbd-9a64-d51343464f59",
                "poids": 1,
                "etapeSuivanteId": "22c5ccfb-7471-4054-927b-46a6bb786beb"
              }
            ]
          },
          {
            "id": "c51b2868-8053-4f1b-8436-68f1a311ff00",
            "titre": "on veut passer notre chemin",
            "texte": '',
            "libelle": "passer",
            "consequencePossibles": []
          }
        ],
        "effets": []
      },
      {
        "id": "22c5ccfb-7471-4054-927b-46a6bb786beb",
        "titre": "Atterissage",
        "texte": "On se pose dans une clairière au milieu de la végétation. Tout est magnifique. On entend (ou bien scanners du vaisseau perçoivent de l’eau dans les environs, ou les deux) une cascade pas loin, peut être celle vue en rêve ? Continuer ?\n",
        "order": 0,
        "finScenario": false,
        "reponses": [
          {
            "id": "c2de5358-85f6-41e0-b598-1a90dd6e85be",
            "titre": "Explorer",
            "texte": " on arrive devant la fontaine. le paysage est magnifique, luxuriant. Etrangement, il y a un endroit ou la nature a l’air de ne pas vouloir approcher. Les racines des arbres ont des tracés qui laissent à penser qu’elles contournent. Analyser la facade ?\n",
            "libelle": "explorer",
            "consequencePossibles": []
          }
        ],
        "effets": []
      }
    ]
  }
]
