# Objectif
L'objectif de ce projet est de réaliser un lecteur de radio en utilisant reactjs. Ce lecteur doit permettre de :
<ul>
  <li>afficher la liste des radios disponibles ;<li>
  <li>
    à la sélection de l'une des radios
    <ul>
      <li>afficher ses détails, tout en conservant la liste</li>
      <li>déclencher la lecture du flux. Si un flux était déjà en cours, celui-ci est arrêté et le nouveau flux est lu à sa place. L'utilisateur doit être informé lorsque le flux est en cours de chargement. Il doit également avoir la possibilité de mettre en pause et redémarrer le flux avec un bouton dédié à cela. Vous ne devez pas utiliser les boutons de control par défaut de la balise audio.</li>
    </ul>
  </li>
</ul>
Afin de simplifier l'utilisation du lecteur, l'utilisateur doit pouvoir utiliser un système de tags pour filtrer les radios disponibles. Il doit être possible de sélectionner/désélectionner un tag ou tous les tags d'un coup. La modification de la sélection des tags ne doit pas avoir d'incidence sur la radio actuellement lue.
<br><br>
Pour avoir une idée plus précise, vous pouvez manipuler directement l'application qui vous a été présentée en suivant ce lien.

# Bonus
En plus des éléments présenté ci-dessus, je vous invite à améliorer le système de filtre par tag. Vous pouvez par exemple ajouter une recherche à l'aide d'un champ texte, soit sur les tags, soit sur les noms de radio, voir les deux.

N'hésitez pas à modifier le fichier qui contient la liste des radios pour améliorer le système de tags. Attention cependant à ce que cela ne constitue pas votre seul travail.

# Informations utiles
Afin de ne pas perdre trop de temps, je vous invite à regarder plus précisément les éléments suivants :
<ul>
  <li>Element non managé dans react (cf. attribut "ref" dans la documentation officielle).</li>
  <li>Element audio html5, et en particulier les événements associés (cf. documentation sur le site de Mozilla).</li>
<ul>
