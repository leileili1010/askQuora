"""empty message

Revision ID: 98c028500788
Revises: c01bb2853ca8
Create Date: 2024-03-08 17:32:55.091480

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '98c028500788'
down_revision = 'c01bb2853ca8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('answers', schema=None) as batch_op:
        batch_op.drop_column('cover_img')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('answers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cover_img', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
