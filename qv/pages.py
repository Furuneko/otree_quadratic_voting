from otree.api import Currency as c, currency_range
from ._builtin import Page, WaitPage
from .models import Constants


class QV(Page):
    form_model = 'player'
    form_fields = ['q' + str(n) for n in range(1, len(Constants.questions)+1)] + \
                  ['q' + str(n) + '_agree' for n in range(1, len(Constants.questions)+1)]

    def vars_for_template(self):
        return {
            'title': self.session.vars['survey_title'],
            'num_questions': len(Constants.questions),
            'questions': self.participant.vars['questions'],
            'credits': Constants.vote_credits
        }


page_sequence = [
    QV
]
