import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import cardImg from '../../assets/big-tractor.jpg'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const formatDate = (dateString) => format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MainCard({ product }) {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {product.supplier.name.substring(0, 1).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.supplier.name.substring(0, 1).toUpperCase() + product.supplier.name.substring(1)}
        subheader={formatDate(product.supplier.date_debut)}
      />
      <CardMedia
        component="img"
        height="194"
        image={cardImg}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.designation}, {product.reference}, {product.prix_tarif} DH, TVA {product.TVA}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            L'histoire de <strong>{product.designation}</strong> commence avec la référence unique <strong>{product.reference}</strong>. Son prix catalogue est de <strong>{product.prix_tarif} €</strong>, avec un prix d'achat de <strong>{product.prix_achat} €</strong> et un prix de vente de <strong>{product.prix_vente} €</strong>. Il offre une marge brute de <strong>{(product.marge_brut * 100).toFixed(2)}%</strong> et une remise de <strong>{(product.remise * 100).toFixed(2)}%</strong>.
          </Typography>
          <Typography paragraph>
            Ce produit appartient à la sous-catégorie ID <strong>{product.sub_category_id}</strong> et est fourni par <strong>{product.supplier.name}</strong> (ID: <strong>{product.supplier.id}</strong>). Le fournisseur est partenaire depuis le <strong>{formatDate(product.supplier.date_debut)}</strong> et offre une remise de <strong>{(product.supplier.remise_f * 100).toFixed(2)}%</strong>.
          </Typography>
          <Typography paragraph>
            Le prix de vente net de <strong>{product.designation}</strong> est de <strong>{product.prix_vente_net} €</strong>, TVA incluse de <strong>{(product.TVA * 100).toFixed(2)}%</strong>. Dernière mise à jour : <strong>{formatDate(product.updated_at)}</strong>. Actuellement, ce produit est <strong>{product.is_deleted === "no" ? "actif" : "inactif"}</strong>.
          </Typography>
          <Typography>
            Produit créé le <strong>{formatDate(product.created_at)}</strong>. Découvrez la qualité de <strong>{product.designation}</strong>.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
